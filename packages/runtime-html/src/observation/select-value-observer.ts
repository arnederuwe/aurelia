import {
  CollectionKind,
  LifecycleFlags as LF,
  subscriberCollection,
  AccessorType,
  withFlushQueue,
  LifecycleFlags,
} from '@aurelia/runtime';

import type { INode } from '../dom';
import type { EventSubscriber } from './event-delegator';
import type {
  ICollectionObserver,
  IndexMap,
  IObserver,
  IObserverLocator,
  ISubscriber,
  ISubscriberCollection,
  IWithFlushQueue,
  IFlushable,
  FlushQueue,
} from '@aurelia/runtime';

const hasOwn = Object.prototype.hasOwnProperty;
const childObserverOptions = {
  childList: true,
  subtree: true,
  characterData: true
};

function defaultMatcher(a: unknown, b: unknown): boolean {
  return a === b;
}

export interface ISelectElement extends HTMLSelectElement {
  options: HTMLCollectionOf<IOptionElement> & Pick<HTMLOptionsCollection, 'length' | 'selectedIndex' | 'add' | 'remove'>;
  matcher?: typeof defaultMatcher;
}
export interface IOptionElement extends HTMLOptionElement {
  model?: unknown;
}

export interface SelectValueObserver extends
  ISubscriberCollection {}

export class SelectValueObserver implements IObserver, IFlushable, IWithFlushQueue {
  public value: unknown = void 0;
  public oldValue: unknown = void 0;

  public readonly obj: ISelectElement;

  public hasChanges: boolean = false;
  // ObserverType.Layout is not always true
  // but for simplicity, always treat as such
  public type: AccessorType = AccessorType.Node | AccessorType.Observer | AccessorType.Layout;

  public arrayObserver?: ICollectionObserver<CollectionKind.array> = void 0;
  public nodeObserver?: MutationObserver = void 0;
  public readonly queue!: FlushQueue;

  private observing: boolean = false;

  public constructor(
    obj: INode,
    // deepscan-disable-next-line
    _key: PropertyKey,
    public readonly handler: EventSubscriber,
    public readonly observerLocator: IObserverLocator,
  ) {
    this.obj = obj as ISelectElement;
  }

  public getValue(): unknown {
    // is it safe to assume the observer has the latest value?
    // todo: ability to turn on/off cache based on type
    return this.observing
      ? this.value
      : this.obj.multiple
        ? Array.from(this.obj.options).map(o => o.value)
        : this.obj.value;
  }

  public setValue(newValue: unknown, flags: LF): void {
    this.value = newValue;
    this.hasChanges = newValue !== this.oldValue;
    this.observeArray(newValue instanceof Array ? newValue : null);
    if ((flags & LF.noFlush) === 0) {
      this.flushChanges(flags);
    }
  }

  public flushChanges(flags: LF): void {
    if (this.hasChanges) {
      this.hasChanges = false;
      this.synchronizeOptions();
    }
  }

  public handleCollectionChange(): void {
    // always sync "selected" property of <options/>
    // immediately whenever the array notifies its mutation
    this.synchronizeOptions();
  }

  public synchronizeOptions(indexMap?: IndexMap): void {
    const { value: currentValue, obj } = this;
    const isArray = Array.isArray(currentValue);
    const matcher = obj.matcher !== void 0 ? obj.matcher : defaultMatcher;
    const options = obj.options;
    let i = options.length;

    while (i-- > 0) {
      const option = options[i];
      const optionValue = hasOwn.call(option, 'model') ? option.model : option.value;
      if (isArray) {
        option.selected = (currentValue as unknown[]).findIndex(item => !!matcher(optionValue, item)) !== -1;
        continue;
      }
      option.selected = !!matcher(optionValue, currentValue);
    }
  }

  public synchronizeValue(): boolean {
    // Spec for synchronizing value from `<select/>`  to `SelectObserver`
    // When synchronizing value to observed <select/> element, do the following steps:
    // A. If `<select/>` is multiple
    //    1. Check if current value, called `currentValue` is an array
    //      a. If not an array, return true to signal value has changed
    //      b. If is an array:
    //        i. gather all current selected <option/>, in to array called `values`
    //        ii. loop through the `currentValue` array and remove items that are nolonger selected based on matcher
    //        iii. loop through the `values` array and add items that are selected based on matcher
    //        iv. Return false to signal value hasn't changed
    // B. If the select is single
    //    1. Let `value` equal the first selected option, if no option selected, then `value` is `null`
    //    2. assign `this.currentValue` to `this.oldValue`
    //    3. assign `value` to `this.currentValue`
    //    4. return `true` to signal value has changed
    const obj = this.obj;
    const options = obj.options;
    const len = options.length;
    const currentValue = this.value;
    let i = 0;

    if (obj.multiple) {
      // A.
      if (!(currentValue instanceof Array)) {
        // A.1.a
        return true;
      }
      // A.1.b
      // multi select
      let option: IOptionElement;
      const matcher = obj.matcher || defaultMatcher;
      // A.1.b.i
      const values: unknown[] = [];
      while (i < len) {
        option = options[i];
        if (option.selected) {
          values.push(hasOwn.call(option, 'model')
            ? option.model
            : option.value
          );
        }
        ++i;
      }
      // A.1.b.ii
      i = 0;
      while (i < currentValue.length) {
        const a = currentValue[i];
        // Todo: remove arrow fn
        if (values.findIndex(b => !!matcher(a, b)) === -1) {
          currentValue.splice(i, 1);
        } else {
          ++i;
        }
      }
      // A.1.b.iii
      i = 0;
      while (i < values.length) {
        const a = values[i];
        // Todo: remove arrow fn
        if (currentValue.findIndex(b => !!matcher(a, b)) === -1) {
          currentValue.push(a);
        }
        ++i;
      }
      // A.1.b.iv
      return false;
    }
    // B. single select
    // B.1
    let value: unknown = null;
    while (i < len) {
      const option = options[i];
      if (option.selected) {
        value = hasOwn.call(option, 'model')
          ? option.model
          : option.value;
        break;
      }
      ++i;
    }
    // B.2
    this.oldValue = this.value;
    // B.3
    this.value = value;
    // B.4
    return true;
  }

  private start(): void {
    (this.nodeObserver = new this.obj.ownerDocument.defaultView!.MutationObserver(this.handleNodeChange.bind(this)))
      .observe(this.obj, childObserverOptions);
    this.observeArray(this.value instanceof Array ? this.value : null);
    this.observing = true;
  }

  private stop(): void {
    this.nodeObserver!.disconnect();
    this.arrayObserver?.unsubscribe(this);
    this.nodeObserver
      = this.arrayObserver
      = void 0;
    this.observing = false;
  }

  // todo: observe all kind of collection
  private observeArray(array: unknown[] | null): void {
    this.arrayObserver?.unsubscribe(this);
    this.arrayObserver = void 0;
    if (array != null) {
      if (!this.obj.multiple) {
        throw new Error('Only null or Array instances can be bound to a multi-select.');
      }
      (this.arrayObserver = this.observerLocator.getArrayObserver(array)).subscribe(this);
    }
  }

  public handleEvent(): void {
    const shouldNotify = this.synchronizeValue();
    if (shouldNotify) {
      this.queue.add(this);
      // this.subs.notify(this.currentValue, this.oldValue, LF.none);
    }
  }

  public handleNodeChange(): void {
    this.synchronizeOptions();
    const shouldNotify = this.synchronizeValue();
    if (shouldNotify) {
      this.queue.add(this);
    }
  }

  public subscribe(subscriber: ISubscriber): void {
    if (this.subs.add(subscriber) && this.subs.count === 1) {
      this.handler.subscribe(this.obj, this);
      this.start();
    }
  }

  public unsubscribe(subscriber: ISubscriber): void {
    if (this.subs.remove(subscriber) && this.subs.count === 0) {
      this.handler.dispose();
      this.stop();
    }
  }

  public flush(): void {
    this.subs.notify(this.value, this.oldValue, LifecycleFlags.none);
  }
}

subscriberCollection(SelectValueObserver);
withFlushQueue(SelectValueObserver);

import { IIndexable } from '@aurelia/kernel';
import { LifecycleFlags } from '../flags';
import { IBindingTargetObserver, IObservable, ISubscriber, AccessorType } from '../observation';
import { IScheduler } from '@aurelia/scheduler';
export interface IDirtyChecker extends DirtyChecker {
}
export declare const IDirtyChecker: import("@aurelia/kernel").InterfaceSymbol<IDirtyChecker>;
export declare const DirtyCheckSettings: {
    /**
     * Default: `6`
     *
     * Adjust the global dirty check frequency.
     * Measures in "frames per check", such that (given an FPS of 60):
     * - A value of 1 will result in 60 dirty checks per second
     * - A value of 6 will result in 10 dirty checks per second
     */
    framesPerCheck: number;
    /**
     * Default: `false`
     *
     * Disable dirty-checking entirely. Properties that cannot be observed without dirty checking
     * or an adapter, will simply not be observed.
     */
    disabled: boolean;
    /**
     * Default: `false`
     *
     * Throw an error if a property is being dirty-checked.
     */
    throw: boolean;
    /**
     * Resets all dirty checking settings to the framework's defaults.
     */
    resetToDefault(): void;
};
export declare class DirtyChecker {
    private readonly scheduler;
    private readonly tracked;
    private task;
    private elapsedFrames;
    constructor(scheduler: IScheduler);
    createProperty(obj: object, propertyName: string): DirtyCheckProperty;
    addProperty(property: DirtyCheckProperty): void;
    removeProperty(property: DirtyCheckProperty): void;
    private check;
}
export interface DirtyCheckProperty extends IBindingTargetObserver {
}
export declare class DirtyCheckProperty implements DirtyCheckProperty {
    private readonly dirtyChecker;
    obj: IObservable & IIndexable;
    propertyKey: string;
    oldValue: unknown;
    type: AccessorType;
    constructor(dirtyChecker: IDirtyChecker, obj: IObservable & IIndexable, propertyKey: string);
    isDirty(): boolean;
    flush(flags: LifecycleFlags): void;
    subscribe(subscriber: ISubscriber): void;
    unsubscribe(subscriber: ISubscriber): void;
}
//# sourceMappingURL=dirty-checker.d.ts.map
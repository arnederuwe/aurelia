(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@aurelia/runtime"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ExpressionWatcher = exports.ComputedWatcher = void 0;
    /* eslint-disable eqeqeq, compat/compat */
    const runtime_1 = require("@aurelia/runtime");
    const { enter, exit } = runtime_1.ConnectableSwitcher;
    const { wrap, unwrap } = runtime_1.ProxyObservable;
    class ComputedWatcher {
        constructor(obj, observerLocator, get, cb, useProxy) {
            this.obj = obj;
            this.observerLocator = observerLocator;
            this.get = get;
            this.cb = cb;
            this.useProxy = useProxy;
            this.interceptor = this;
            this.value = void 0;
            this.isBound = false;
            // todo: maybe use a counter allow recursive call to a certain level
            this.running = false;
            runtime_1.connectable.assignIdTo(this);
        }
        handleChange() {
            this.run();
        }
        handleCollectionChange() {
            this.run();
        }
        $bind() {
            if (this.isBound) {
                return;
            }
            this.isBound = true;
            this.compute();
        }
        $unbind() {
            if (!this.isBound) {
                return;
            }
            this.isBound = false;
            this.obs.clear(true);
            this.cObs.clear(true);
        }
        run() {
            if (!this.isBound || this.running) {
                return;
            }
            const obj = this.obj;
            const oldValue = this.value;
            const newValue = this.compute();
            if (!Object.is(newValue, oldValue)) {
                // should optionally queue
                this.cb.call(obj, newValue, oldValue, obj);
            }
        }
        compute() {
            this.running = true;
            this.obs.version++;
            try {
                enter(this);
                return this.value = unwrap(this.get.call(void 0, this.useProxy ? wrap(this.obj) : this.obj, this));
            }
            finally {
                this.obs.clear(false);
                this.cObs.clear(false);
                this.running = false;
                exit(this);
            }
        }
    }
    exports.ComputedWatcher = ComputedWatcher;
    class ExpressionWatcher {
        constructor(scope, locator, observerLocator, expression, callback) {
            this.scope = scope;
            this.locator = locator;
            this.observerLocator = observerLocator;
            this.expression = expression;
            this.callback = callback;
            this.interceptor = this;
            this.isBound = false;
            this.obj = scope.bindingContext;
            runtime_1.connectable.assignIdTo(this);
        }
        handleChange(value) {
            const expr = this.expression;
            const obj = this.obj;
            const oldValue = this.value;
            const canOptimize = expr.$kind === 10082 /* AccessScope */ && this.obs.count === 1;
            if (!canOptimize) {
                this.obs.version++;
                value = expr.evaluate(0, this.scope, null, this.locator, this);
                this.obs.clear(false);
            }
            if (!Object.is(value, oldValue)) {
                this.value = value;
                // should optionally queue for batch synchronous
                this.callback.call(obj, value, oldValue, obj);
            }
        }
        $bind() {
            if (this.isBound) {
                return;
            }
            this.isBound = true;
            this.obs.version++;
            this.value = this.expression.evaluate(0 /* none */, this.scope, null, this.locator, this);
            this.obs.clear(false);
        }
        $unbind() {
            if (!this.isBound) {
                return;
            }
            this.isBound = false;
            this.obs.clear(true);
            this.value = void 0;
        }
    }
    exports.ExpressionWatcher = ExpressionWatcher;
    runtime_1.connectable(ComputedWatcher);
    runtime_1.connectable(ExpressionWatcher);
});
//# sourceMappingURL=watchers.js.map
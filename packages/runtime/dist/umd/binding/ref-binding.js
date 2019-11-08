(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./ast"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const ast_1 = require("./ast");
    class RefBinding {
        constructor(sourceExpression, target, locator) {
            this.sourceExpression = sourceExpression;
            this.target = target;
            this.locator = locator;
            this.$state = 0 /* none */;
            this.$scope = void 0;
        }
        $bind(flags, scope, part) {
            if (this.$state & 4 /* isBound */) {
                if (this.$scope === scope) {
                    return;
                }
                this.$unbind(flags | 4096 /* fromBind */);
            }
            // add isBinding flag
            this.$state |= 1 /* isBinding */;
            this.$scope = scope;
            this.part = part;
            if (ast_1.hasBind(this.sourceExpression)) {
                this.sourceExpression.bind(flags, scope, this);
            }
            this.sourceExpression.assign(flags | 32 /* updateSourceExpression */, this.$scope, this.locator, this.target, part);
            // add isBound flag and remove isBinding flag
            this.$state |= 4 /* isBound */;
            this.$state &= ~1 /* isBinding */;
        }
        $unbind(flags) {
            if (!(this.$state & 4 /* isBound */)) {
                return;
            }
            // add isUnbinding flag
            this.$state |= 2 /* isUnbinding */;
            let sourceExpression = this.sourceExpression;
            if (sourceExpression.evaluate(flags, this.$scope, this.locator, this.part) === this.target) {
                sourceExpression.assign(flags, this.$scope, this.locator, null, this.part);
            }
            // source expression might have been modified durring assign, via a BB
            sourceExpression = this.sourceExpression;
            if (ast_1.hasUnbind(sourceExpression)) {
                sourceExpression.unbind(flags, this.$scope, this);
            }
            this.$scope = void 0;
            // remove isBound and isUnbinding flags
            this.$state &= ~(4 /* isBound */ | 2 /* isUnbinding */);
        }
        observeProperty(flags, obj, propertyName) {
            return;
        }
        handleChange(newValue, previousValue, flags) {
            return;
        }
    }
    exports.RefBinding = RefBinding;
});
//# sourceMappingURL=ref-binding.js.map
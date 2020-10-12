import { ICompositionRoot } from '@aurelia/runtime';
declare type ErrorMatcher = string | Error | RegExp | Function;
export declare function throws(fn: () => any, errorMatcher?: ErrorMatcher, message?: string): void;
export declare function rejects(promiseFn: () => Promise<any>, errorMatcher?: ErrorMatcher, message?: string): Promise<void>;
export declare function doesNotThrow(fn: () => any, errorMatcher?: ErrorMatcher, message?: string): void;
export declare function doesNotReject(promiseFn: () => Promise<any>, errorMatcher?: ErrorMatcher, message?: string): Promise<void>;
export declare function ifError(err?: Error): void;
export declare function ok(...args: [any, string | Error]): void;
export declare function fail(message?: string | Error): never;
export declare function visibleTextEqual(root: ICompositionRoot, expectedText: string, message?: string): void;
export declare function equal(actual: any, expected: any, message?: string): void;
export declare function typeOf(actual: any, expected: any, message?: string): void;
export declare function instanceOf(actual: any, expected: any, message?: string): void;
export declare function notInstanceOf(actual: any, expected: any, message?: string): void;
export declare function includes(outer: any[], inner: any, message?: string): void;
export declare function includes(outer: string, inner: string, message?: string): void;
export declare function notIncludes(outer: any[], inner: any, message?: string): void;
export declare function notIncludes(outer: string, inner: string, message?: string): void;
export declare function contains(outer: any, inner: any, message?: string): void;
export declare function notContains(outer: any, inner: any, message?: string): void;
export declare function greaterThan(left: any, right: any, message?: string): void;
export declare function greaterThanOrEqualTo(left: any, right: any, message?: string): void;
export declare function lessThan(left: any, right: any, message?: string): void;
export declare function lessThanOrEqualTo(left: any, right: any, message?: string): void;
export declare function notEqual(actual: any, expected: any, message?: string): void;
export declare function deepEqual(actual: any, expected: any, message?: string): void;
export declare function notDeepEqual(actual: any, expected: any, message?: string): void;
export declare function deepStrictEqual(actual: any, expected: any, message?: string): void;
export declare function notDeepStrictEqual(actual: any, expected: any, message?: string): void;
export declare function strictEqual(actual: any, expected: any, message?: string): void;
export declare function notStrictEqual(actual: any, expected: any, message?: string): void;
export declare function match(actual: any, regex: RegExp, message?: string): void;
export declare function notMatch(actual: any, regex: RegExp, message?: string): void;
export declare function isCustomElementType(actual: any, message?: string): void;
export declare function isCustomAttributeType(actual: any, message?: string): void;
declare function isTextContentEqual(elementOrSelector: string | Node, expectedText: string, message?: string, root?: Node): void;
declare function isValueEqual(inputElementOrSelector: string | Node, expected: unknown, message?: string, root?: Node): void;
declare function isInnerHtmlEqual(elementOrSelector: string | Node, expected: string, message?: string, root?: Node, compact?: boolean): void;
declare function computedStyle(element: Node, expectedStyles: Record<string, string>, message?: string): void;
declare function notComputedStyle(element: Node, expectedStyles: Record<string, string>, message?: string): void;
declare const assert: Readonly<{
    throws: typeof throws;
    doesNotThrow: typeof doesNotThrow;
    rejects: typeof rejects;
    doesNotReject: typeof doesNotReject;
    ok: typeof ok;
    fail: typeof fail;
    equal: typeof equal;
    typeOf: typeof typeOf;
    instanceOf: typeof instanceOf;
    notInstanceOf: typeof notInstanceOf;
    includes: typeof includes;
    notIncludes: typeof notIncludes;
    contains: typeof contains;
    notContains: typeof notContains;
    greaterThan: typeof greaterThan;
    greaterThanOrEqualTo: typeof greaterThanOrEqualTo;
    lessThan: typeof lessThan;
    lessThanOrEqualTo: typeof lessThanOrEqualTo;
    notEqual: typeof notEqual;
    deepEqual: typeof deepEqual;
    notDeepEqual: typeof notDeepEqual;
    deepStrictEqual: typeof deepStrictEqual;
    notDeepStrictEqual: typeof notDeepStrictEqual;
    strictEqual: typeof strictEqual;
    notStrictEqual: typeof notStrictEqual;
    match: typeof match;
    notMatch: typeof notMatch;
    visibleTextEqual: typeof visibleTextEqual;
    isSchedulerEmpty: (clearBeforeThrow?: any) => void;
    isCustomElementType: typeof isCustomElementType;
    isCustomAttributeType: typeof isCustomAttributeType;
    strict: {
        deepEqual: typeof deepStrictEqual;
        notDeepEqual: typeof notDeepStrictEqual;
        equal: typeof strictEqual;
        notEqual: typeof notStrictEqual;
    };
    html: {
        textContent: typeof isTextContentEqual;
        innerEqual: typeof isInnerHtmlEqual;
        value: typeof isValueEqual;
        computedStyle: typeof computedStyle;
        notComputedStyle: typeof notComputedStyle;
    };
}>;
export { assert };
//# sourceMappingURL=assert.d.ts.map
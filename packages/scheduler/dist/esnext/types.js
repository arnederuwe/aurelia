export var TaskQueuePriority;
(function (TaskQueuePriority) {
    TaskQueuePriority[TaskQueuePriority["microTask"] = 0] = "microTask";
    TaskQueuePriority[TaskQueuePriority["render"] = 1] = "render";
    TaskQueuePriority[TaskQueuePriority["macroTask"] = 2] = "macroTask";
    TaskQueuePriority[TaskQueuePriority["postRender"] = 3] = "postRender";
})(TaskQueuePriority || (TaskQueuePriority = {}));
export const defaultQueueTaskOptions = {
    delay: 0,
    preempt: false,
    priority: 1 /* render */,
    persistent: false,
    reusable: true,
    suspend: false,
};
let $resolve;
let $reject;
function executor(resolve, reject) {
    $resolve = resolve;
    $reject = reject;
}
/**
 * Efficiently create a promise where the `resolve` and `reject` functions are stored as properties on the prommise itself.
 */
export function createExposedPromise() {
    const p = new Promise(executor);
    p.resolve = $resolve;
    p.reject = $reject;
    return p;
}
//# sourceMappingURL=types.js.map
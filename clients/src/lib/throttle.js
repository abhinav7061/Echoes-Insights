const throttle = (func, limit) => {
    let lastRan = 0;
    let timeout = null;

    const throttled = function (...args) {
        const context = this;
        const now = Date.now();
        const remaining = limit - (now - lastRan);

        if (remaining <= 0) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            lastRan = now;
            func.apply(context, args);
        } else if (!timeout) {
            timeout = setTimeout(() => {
                lastRan = Date.now();
                timeout = null;
                func.apply(context, args);
            }, remaining);
        }
    };

    throttled.cancel = () => {
        clearTimeout(timeout);
        timeout = null;
    };

    return throttled;
};

export default throttle;
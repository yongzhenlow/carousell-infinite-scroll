window.addEventListener('load', function () {
    var timeoutId;
    var timeoutDuration = 1000;
    var isObserving = false;
    var observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0,
    };
    timeoutId = setTimeout(observeButton, timeoutDuration);
    function observeButton() {
        var buttonElement = document.querySelector('main > div > button:last-child');
        if (buttonElement && !isObserving) {
            isObserving = true;
            var observer_1 = new IntersectionObserver(function (entries) {
                for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
                    var entry = entries_1[_i];
                    var intersectionRatio = entry.intersectionRatio, isIntersecting = entry.isIntersecting, target = entry.target;
                    if (intersectionRatio > observerOptions.threshold ||
                        isIntersecting) {
                        ;
                        target.click();
                        isObserving = false;
                        observer_1.unobserve(target);
                        clearTimeout(timeoutId);
                        timeoutId = setTimeout(observeButton, timeoutDuration);
                    }
                }
            }, observerOptions);
            observer_1.observe(buttonElement);
        }
        else {
            timeoutId = setTimeout(observeButton, timeoutDuration);
        }
    }
}, false);

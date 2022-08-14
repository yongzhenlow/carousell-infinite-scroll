window.addEventListener('load', () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0,
    };
    observeButton();
    function observeButton() {
        var _a;
        const buttonElement = (_a = document.querySelector('main > div > button:last-child')) !== null && _a !== void 0 ? _a : document.querySelector('#root > div > div > div > button:last-child');
        if (buttonElement) {
            const observer = new IntersectionObserver((entries) => {
                for (const entry of entries) {
                    const { intersectionRatio, isIntersecting, target } = entry;
                    if (intersectionRatio > observerOptions.threshold ||
                        isIntersecting) {
                        ;
                        target.click();
                        observer.unobserve(target);
                    }
                }
            }, observerOptions);
            observer.observe(buttonElement);
            const mutationObserver = new MutationObserver((mutationList) => {
                const removed = mutationList.some((mutation) => Array.from(mutation.removedNodes).includes(buttonElement));
                if (removed) {
                    mutationObserver.disconnect();
                    observer.unobserve(buttonElement);
                    observeButton();
                }
            });
            mutationObserver.observe(document.querySelector('#root'), {
                childList: true,
                subtree: true,
            });
        }
        else {
            setTimeout(observeButton, 2000);
        }
    }
}, false);

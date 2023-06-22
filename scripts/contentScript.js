const cisInfiniteScroll = () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0,
    };
    observeButton();
    function observeButton() {
        var _a;
        const buttonElement = (_a = document.querySelector('#main > div.D_S > div > section.D_af > div.D_ak > div > button')) !== null && _a !== void 0 ? _a : document.querySelector('#main > div.D_gh > div > button');
        if (buttonElement) {
            const observer = new IntersectionObserver((entries) => {
                for (const entry of entries) {
                    const { intersectionRatio, isIntersecting, target } = entry;
                    if (intersectionRatio > observerOptions.threshold || isIntersecting) {
                        console.log('wtf');
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
};
['load', 'popstate'].forEach(function (e) {
    window.addEventListener(e, cisInfiniteScroll, false);
});

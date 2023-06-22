window.addEventListener(
  'load',
  () => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    }

    observeButton()

    function observeButton() {
      // Check button is in listing page or 'you may like' section
      const buttonElement =
        document.querySelector<HTMLButtonElement>(
          '#main > div.D_S > div > section.D_af > div.D_ak > div > button'
        ) ??
        document.querySelector<HTMLButtonElement>(
          '#main > div.D_gh > div > button'
        )

      if (buttonElement) {
        const observer = new IntersectionObserver((entries) => {
          for (const entry of entries) {
            const { intersectionRatio, isIntersecting, target } = entry
            if (
              intersectionRatio > observerOptions.threshold ||
              isIntersecting
            ) {
              // Trigger click on load more button
              ;(target as HTMLButtonElement).click()

              observer.unobserve(target)
            }
          }
        }, observerOptions)
        observer.observe(buttonElement)

        const mutationObserver = new MutationObserver((mutationList) => {
          // Check if the button was removed/replaced
          const removed = mutationList.some((mutation) =>
            Array.from(mutation.removedNodes).includes(buttonElement)
          )

          if (removed) {
            mutationObserver.disconnect()
            observer.unobserve(buttonElement)
            observeButton()
          }
        })

        mutationObserver.observe(
          document.querySelector<HTMLButtonElement>('#root'),
          {
            childList: true,
            subtree: true,
          }
        )
      } else {
        // Retry if button has not been mounted yet
        setTimeout(observeButton, 2000)
      }
    }
  },
  false
)

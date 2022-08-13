window.addEventListener(
  'load',
  () => {
    let timeoutId: number
    // Check every n milliseconds
    const timeoutDuration = 1000
    let isObserving = false
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    }

    // Set a timer to detect when new load button has been added to the DOM
    timeoutId = setTimeout(observeButton, timeoutDuration)

    function observeButton() {
      const buttonElement = document.querySelector<HTMLButtonElement>(
        'main > div > button:last-child'
      )

      if (buttonElement && !isObserving) {
        isObserving = true
        const observer = new IntersectionObserver((entries) => {
          for (const entry of entries) {
            const { intersectionRatio, isIntersecting, target } = entry
            if (
              intersectionRatio > observerOptions.threshold ||
              isIntersecting
            ) {
              // Trigger click on load more button
              ;(target as HTMLButtonElement).click()

              // Reset and start again
              isObserving = false
              observer.unobserve(target)
              clearTimeout(timeoutId)
              timeoutId = setTimeout(observeButton, timeoutDuration)
            }
          }
        }, observerOptions)
        observer.observe(buttonElement)
      } else {
        timeoutId = setTimeout(observeButton, timeoutDuration)
      }
    }
  },
  false
)

'use client'

import { useEffect } from 'react'

export function WebringEmbed() {
  useEffect(() => {
    // Load the webring script
    const script = document.createElement('script')
    script.src = 'https://uwaterloo.network/embed.js'
    script.setAttribute('data-webring', '')
    script.setAttribute('data-user', 'your-name')
    document.body.appendChild(script)

    // Wait for the webring element to be injected, then move it to our container
    const checkForWebring = setInterval(() => {
      const webringElement = document.querySelector('[data-webring]') as HTMLElement
      if (webringElement && webringElement.parentElement) {
        const container = document.getElementById('webring-wrapper')
        if (container && webringElement.parentElement !== container) {
          // Move the element to our container (scaling is handled by CSS on the container)
          container.appendChild(webringElement)
          clearInterval(checkForWebring)
        }
      }
    }, 100)

    return () => {
      clearInterval(checkForWebring)
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [])

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div 
        id="webring-wrapper" 
        className="inline-block"
        style={{
          transform: 'scale(0.4)',
          transformOrigin: 'bottom right',
        }}
      />
    </div>
  )
}


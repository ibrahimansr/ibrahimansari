"use client"

import { useEffect, useRef } from "react"

export default function Webring() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Check if script already exists
    const existingScript = containerRef.current.querySelector('script')
    if (existingScript) return

    const script = document.createElement('script')
    script.src = 'https://uwaterloo.network/embed.js'
    script.setAttribute('data-webring', '')
    script.setAttribute('data-user', 'ibrahim-ansari')
    
    containerRef.current.appendChild(script)

    // Apply filters to webring elements after they're created
    const applyFilters = () => {
      const webringDiv = containerRef.current?.querySelector('div')
      const webringIframe = containerRef.current?.querySelector('iframe')
      
      if (webringDiv) {
        webringDiv.style.backgroundColor = 'transparent'
        webringDiv.style.border = 'none'
        webringDiv.style.boxShadow = 'none'
        webringDiv.style.padding = '0'
        
        // Check for dark mode
        if (document.documentElement.classList.contains('dark')) {
          // White in dark mode - use brightness and invert for pure white, increase contrast for whiter
          webringDiv.style.filter = 'brightness(0) invert(1) contrast(1.5)'
        } else {
          // Dark in light mode - make it darker/blacker with higher contrast
          webringDiv.style.filter = 'brightness(0) contrast(1.5)'
        }
      }
      
      if (webringIframe) {
        if (document.documentElement.classList.contains('dark')) {
          // White in dark mode - whiter
          webringIframe.style.filter = 'brightness(0) invert(1) contrast(1.5)'
        } else {
          // Dark in light mode - darker
          webringIframe.style.filter = 'brightness(0) contrast(1.5)'
        }
      }
    }

    // Apply filters immediately and on interval
    applyFilters()
    const interval = setInterval(applyFilters, 100)
    
    // Also listen for theme changes
    const observer = new MutationObserver(() => {
      applyFilters()
    })
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    return () => {
      clearInterval(interval)
      observer.disconnect()
      if (containerRef.current && script.parentNode === containerRef.current) {
        containerRef.current.removeChild(script)
      }
    }
  }, [])

  return (
    <div 
      ref={containerRef} 
      className="flex items-center scale-50 origin-center opacity-50 hover:opacity-100 transition-opacity duration-200 [&>div]:!bg-transparent [&>div]:!border-none [&>div]:!shadow-none [&>div]:!p-0" 
    />
  )
}


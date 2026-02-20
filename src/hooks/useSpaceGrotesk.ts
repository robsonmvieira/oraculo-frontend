import { useEffect } from 'react'

const LINK_ID = 'space-grotesk-font'
const PRECONNECT_GOOGLE = 'preconnect-google-fonts'
const PRECONNECT_GSTATIC = 'preconnect-gstatic'

export function useSpaceGrotesk() {
  useEffect(() => {
    if (document.getElementById(LINK_ID)) return

    const preconnect1 = document.createElement('link')
    preconnect1.id = PRECONNECT_GOOGLE
    preconnect1.rel = 'preconnect'
    preconnect1.href = 'https://fonts.googleapis.com'
    document.head.appendChild(preconnect1)

    const preconnect2 = document.createElement('link')
    preconnect2.id = PRECONNECT_GSTATIC
    preconnect2.rel = 'preconnect'
    preconnect2.href = 'https://fonts.gstatic.com'
    preconnect2.crossOrigin = 'anonymous'
    document.head.appendChild(preconnect2)

    const link = document.createElement('link')
    link.id = LINK_ID
    link.rel = 'stylesheet'
    link.href =
      'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap'
    document.head.appendChild(link)

    return () => {
      document.getElementById(LINK_ID)?.remove()
      document.getElementById(PRECONNECT_GOOGLE)?.remove()
      document.getElementById(PRECONNECT_GSTATIC)?.remove()
    }
  }, [])
}

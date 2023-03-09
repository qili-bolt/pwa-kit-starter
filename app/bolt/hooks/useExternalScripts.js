import {useEffect} from 'react'

export default function useExternalScripts(id, url, publishableKey) {
    useEffect(() => {
        const head = document.querySelector('head')
        const script = document.createElement('script')
        script.id = id
        script.src = url
        script.setAttribute('data-publishable-key', publishableKey)
        head.appendChild(script)

        return () => {
            head.removeChild(script)
        }
    }, [url])
}

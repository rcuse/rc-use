import { useState } from 'react'

export function useClipboard({ timeout = 2000 } = {}) {
  const [error, setError] = useState<Error | null>(null)
  const [copied, setCopied] = useState(false)
  const [copyTimeout, setCopyTimeout] = useState<number | null>(null)

  const handleCopyResult = (value: boolean) => {
    window.clearTimeout(copyTimeout!)
    setCopyTimeout(window.setTimeout(() => setCopied(false), timeout))
    setCopied(value)
  }

  const copy = (text: string) => {
    if ('clipboard' in navigator) {
      navigator.clipboard
        .writeText(text)
        .then(() => handleCopyResult(true))
        .catch(setError)
    }
    else {
      setError(new Error('useClipboard: navigator.clipboard is not supported'))
    }
  }

  const reset = () => {
    setCopied(false)
    setError(null)
    window.clearTimeout(copyTimeout!)
  }

  return { copy, reset, error, copied }
}

export function getQueryParamsThroughUrl(url: string | undefined | null) {
  if (!url) return {}

  const queryParams: { [key: string]: string } = {}

  const queryString = url.split('?')[1]
  if (queryString) {
    const regex = /([^&=]+)=([^&]*)/g
    let match
    while ((match = regex.exec(queryString)) !== null) {
      const key = decodeURIComponent(match[1])
      const value = decodeURIComponent(match[2])
      queryParams[key] = value
    }
  }
  return queryParams
}

export function getQueryParamsThroughUrl(url: string | undefined | null) {
  if (!url) return {}

  const queryParams: { [key: string]: string } = {}

  // Removendo qualquer parte do URL antes da interrogação
  const queryStringStartIndex = url.indexOf('?')
  const queryString =
    queryStringStartIndex !== -1 ? url.slice(queryStringStartIndex + 1) : ''

  // Extraindo os parâmetros de consulta da parte restante do URL
  const searchParams = new URLSearchParams(queryString)
  searchParams.forEach((value, key) => {
    queryParams[key] = value
  })

  // Verificando se há hashes na URL e extraindo os parâmetros de consulta do hash
  const hashStartIndex = url.indexOf('#')
  if (hashStartIndex !== -1) {
    const hashString = url.slice(hashStartIndex + 1)
    const hashParams = new URLSearchParams(hashString)
    hashParams.forEach((value, key) => {
      queryParams[key] = value
    })
  }

  return queryParams
}

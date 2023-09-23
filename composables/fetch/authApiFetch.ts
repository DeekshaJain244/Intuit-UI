export const authApiFetch: typeof useFetch = (request, opts?) => {
    const config = useRuntimeConfig()
    // opts.headers["Content-Type"]= "application/json"
    return  useFetch(request, {
        baseURL: config.public.apiAuthURL,
        onRequest({request, options}) {
            options.headers = {
                "Content-Type": "application/json",
            }
        },
        onRequestError({request, options, error}) {
            // Handle the request errors
            console.debug("onRequestError::", request)
        },
        onResponse({request, response, options}) {
            // Process the response data
            // console.debug("onResponse::", response)
            return response._data
        },
        onResponseError({request, response, options}) {
            // Handle the response errors
            console.debug("onResponseError::", request, response)
        },
        credentials: 'include',
        ...opts
    })
}


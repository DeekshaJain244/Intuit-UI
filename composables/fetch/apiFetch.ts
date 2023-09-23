export const useApiFetch: typeof useFetch = async (request, opts?) => {
    const config = useRuntimeConfig()
    const statusCode = ref<number>(200);
    // opts.headers["Content-Type"]= "application/json"
    const asyncData =  useFetch(request, {
        baseURL: config.public.baseURL,
        onRequest({request, options}) {
            // options.headers = {
            //     "Content-Type": "application/json",
            // }
        },
        onRequestError({request, options, error}) {
            // Handle the request errors
            console.debug("onRequestError::", request)
        },
        onResponse({request, response, options}) {
            // Process the response data
            // console.debug("onResponse::", response)
            // return response._data
        },
        onResponseError({request, response, options}) {
            // Handle the response errors
            console.debug("onResponseError::", request, response)
        },
        credentials: 'include',
        ...opts
    })
    return asyncData
}


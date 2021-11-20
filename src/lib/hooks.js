//  from https://github.com/sveltejs/kit/issues/70 @ joelhickok commented on Jul 31

export async function handle({ request, resolve }) {
    if (request.path === '/upload.json' && request.method === 'POST') {
        const filename = request.query.get('filename')
        try {
            // this example show use for a file such as .xlsx instead of the previous example
            // using sharp for an image
            fs.writeFileSync(`static/uploads/${filename}`, request.rawBody, { encoding: 'base64' })
            // file now available for use in local upload path, so create additional logic elsewhere
        } catch (err) {
            console.log(err)
        }
    }

    const response = await resolve(request)

    return {
        ...response,
        headers: {
            ...response.headers,
        }
    }

}
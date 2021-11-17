export async function post(req) {
    console.log(`HANDLER: ${req.path}`)
    try {
        // do something else, or just return a response letting
        // the client know the upload went okay

        return {
            body: {
                success: true,
                filename: req.query.get('filename'),
            },
        }
    } catch (err) {
        return {
            body: err.message
        }
    }
}
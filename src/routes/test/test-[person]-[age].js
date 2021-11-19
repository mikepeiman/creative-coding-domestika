export async function get({params}) {
    return {
        body: `Hello ${params.person}, you are ${params.age} years old. Love you.`
    }
}
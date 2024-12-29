export const getFormData = async ({ request }) => {
    try {
        const res = await request.formData()
        const data = Object.fromEntries(res)
        return data
    } catch (error) {
        console.log(error)
        return error
    }
}
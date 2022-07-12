const BASE_URL = '/'

export const httpGetMessages = async () => {
    const response = await fetch(`/api/getMessages`)
    return response.json()
}

export const httpPostMessage = async (message) => {
    const response = await fetch(`${BASE_URL}api/postMessage`, {
        method: "POST",
        body: JSON.stringify(message)
    });
    return response.json()
}

export const httpDeleteMessage = async (id) => {
    const response = await fetch(`${BASE_URL}api/deleteMessage`, {
        method: "DELETE",
        body: JSON.stringify(id)
    })
    return response.json()
}
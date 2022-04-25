
const apiUrl = "https://jsonplaceholder.typicode.com";

export const getAll = async () => {
    const response = await fetch(`${apiUrl}/todos`);
    if (!response.ok) {
        throw new Error('something was wrong')
    }
    return response.json();
}
export const updateItem = async ({ id, ...data }) => {
    const response = await fetch(`${apiUrl}/todos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        throw new Error(response.json().message)
    }
    return response.json()
}
export const getItem = async ({ queryKey }) => {
    const [key, { id }] = queryKey;
    const response = await fetch(`${apiUrl}/todos/${id}`)
    if (!response.ok) {
        throw new Error(response.json().message)
    }
    return response.json()

}
export const getUserId = async (userId) => {
    const response = await fetch(`${apiUrl}/todos/${userId}`)
    if (!response.ok) {
        throw new Error(response.json().message)
    }
    return response.json()

}

export const removeItem = async (id) => {
    const response = await fetch(`${apiUrl}/todos/${id}`, {
        method: 'DELETE'
    })
    if (!response.ok) {
        throw new Error(response.json().message)
    }
    return true

}
export const createItem = async (data) => {
    const response = await fetch(`${apiUrl}/todos/`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        throw new Error(response.json().message)
    }
    return response.json();
}


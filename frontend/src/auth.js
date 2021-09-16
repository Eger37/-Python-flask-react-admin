import uuid from 'react-uuid'

function getCookie(name) {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop().split(';').shift()
}

export function getId() {
    const name = 'id'
    let id = getCookie(name)
    if (id === undefined) {
        id = uuid()
        document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(id)}`
    }
    return id
}
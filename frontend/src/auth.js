export function isLoggedIn() {
    return localStorage.getItem("access_token")!==null && localStorage.getItem("access_token")!=="undefined"
}

export function getAccessToken() {
    if(localStorage.getItem("access_token"))
        return {"access_token": localStorage.getItem("access_token")}
    return {"access_token": null}
}

export function deleteTokens(){
    localStorage.removeItem("access_token")
}

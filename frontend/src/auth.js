export function isLoggedIn() {
    return localStorage.getItem("access_token")!==null && localStorage.getItem("access_token")!=="undefined";
}

export function getAnyAccessToken() {
    if(localStorage.getItem("access_token"))
        return {"access_token": localStorage.getItem("access_token")}
    else if(localStorage.getItem("anon_access_token"))
        return {"anon_access_token": localStorage.getItem("anon_access_token")}
    return {"access_token": null}
}

export function deleteTokens(){
    localStorage.removeItem("access_token");
    localStorage.removeItem("anon_access_token");
    localStorage.removeItem("username");
}

export function requiredAuth(nextState, replace) {
    if (!isLoggedIn()) {
        replace({
            pathname: '/',
            state: { nextPathname: nextState.location.pathname }
        })
    }
}

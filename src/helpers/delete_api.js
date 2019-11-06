export const get = (url) =>
    new Promise(
        (resolve, reject) => {
            fetch(url)
                .then(response => response.json())
                .then(json => resolve(json))
        }
    )

const apiCall = (url, method, headers, body, resolve, reject) =>
    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            headers
        },
        body: JSON.stringify(body)
    }).then(response => {
        if( response.ok){
            response.json().then(json => resolve(json))
        }else{
            reject(response)
        }
    })

export const post = (url, headers, body) =>
    new Promise(
        (resolve, reject) => apiCall(url, 'POST', headers, body, resolve, reject)
    )

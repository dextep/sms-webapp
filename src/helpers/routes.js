const serverUrl = 'http://localhost:8080'

export const auth = `${serverUrl}/api/auth`;

export const userApiUrl = email => (
    email ? '${serverUrl}/api/v1/user/get/${email}' : '${serverUrl}/api/v1/user/signup'
)

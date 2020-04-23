const serverUrl = 'https://sms-rest-app.herokuapp.com/'

export const auth = `${serverUrl}/api/auth`;
export const signUp = `${serverUrl}/api/v1/user/signup`;
export const event = `${serverUrl}/api/v1/event`;
export const profile = `${serverUrl}/profile`;

export const userApiUrl = email => (
    email ? '${serverUrl}/api/v1/user/get/${email}' : '${serverUrl}/api/v1/user/signup'
)

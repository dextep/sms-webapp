export const serverUrl = 'http://localhost:8080'

export const auth = `${serverUrl}/api/auth`;
export const signUp = `${serverUrl}/api/v1/user/signup`;
export const event = `${serverUrl}/api/v1/event`;
export const profile = `${serverUrl}/profile`;

export const userApiUrl = email => (
    email ? `${serverUrl}/api/v1/user/get/${email}` : `${serverUrl}/api/v1/user/signup`
);

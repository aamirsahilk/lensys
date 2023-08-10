
export function validatePassword(password) {
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
}
export const baseUrl = 'https://techmatrick.com/lensys/';
// export const baseUrlUploads = 'https://server.naijagah.com/';
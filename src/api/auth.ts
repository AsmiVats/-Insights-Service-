import axios from 'axios';

export async function signIn(email: string, password: string) {
    try {
        const res = await axios({
            method: 'POST',
            url: `${import.meta.env.VITE_BACKEND_URL}/auth/signin`,
            data: {
                email,
                password
            }
        });
        return res.data;
    } catch (error) {
        console.error("Sign-in error:", error);
        throw error;
    }
};

export async function signUp(email: string, password: string, shopName: string, accessToken: string) {
    try {
        const res = await axios({
            method: 'POST',
            url: `${import.meta.env.VITE_BACKEND_URL}/auth/signup`,
            data: {
                email,
                password,
                shopName,
                accessToken
            }
        });
        return res.data;
    } catch (error) {
        console.error("Sign-up error:", error);
        throw error;
    }
};
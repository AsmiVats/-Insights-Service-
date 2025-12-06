import axios from 'axios';


export async function fetchOutOfStockProducts(token: string) {
    try {
        const res = await axios({
            method: 'GET',
            url: `${import.meta.env.VITE_BACKEND_URL}/products/outofstock`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        console.error("Fetch out of stock products error:", error);
        throw error;
    }
};

export async function fetchTopProducts(token: string) {
    try {
        const res = await axios({
            method: 'GET',
            url: `${import.meta.env.VITE_BACKEND_URL}/products/topsold`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        console.error("Fetch top products error:", error);
        throw error;
    }
};

export async function fetchTotalProducts(token: string) {
    try {
        const res = await axios({
            method: 'GET',
            url: `${import.meta.env.VITE_BACKEND_URL}/products/totalavailable`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        console.error("Fetch total products error:", error);
        throw error;
    }
};
import axios from 'axios';


export async function fetchTopCustomers(token: string) {
    try {
        const res = await axios({
            method: 'GET',
            url: `${import.meta.env.VITE_BACKEND_URL}/customers/topcustomers`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        console.error("Fetch top customers error:", error);
        throw error;
    }
};

export async function fetchTotalCount(token: string) {
    try {
        const res = await axios({
            method: 'GET',
            url: `${import.meta.env.VITE_BACKEND_URL}/customers/totalcount`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        console.error("Fetch total count error:", error);
        throw error;
    }
};  

export async function fetchRevenueByCustomer(token: string) {
    try {
        const res = await axios({
            method: 'GET',
            url: `${import.meta.env.VITE_BACKEND_URL}/customers/revenuebycustomer`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        console.error("Fetch revenuebycustomer error:", error);
        throw error;
    }
};


export async function topcountries(token: string) {
    try {
        const res = await axios({
            method: 'GET',
            url: `${import.meta.env.VITE_BACKEND_URL}/customers/topcountries`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        console.error("Fetch top countries error:", error);
        throw error;
    }
};
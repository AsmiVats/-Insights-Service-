import axios from 'axios';


export async function fetchTotalOrders(token: string) {
    try {
        const res = await axios({
            method: 'GET',
            url: `${import.meta.env.VITE_BACKEND_URL}/orders/total-orders`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        console.error("Fetch orders error:", error);
        throw error;
    }
};

export async function fetchTotalRevenue(token: string) {
    try {
        const res = await axios({
            method: 'GET',
            url: `${import.meta.env.VITE_BACKEND_URL}/orders/revenue`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        console.error("Fetch total revenue error:", error);
        throw error;
    }
};  

export async function fetchRangeRevenue(token: string, startDate: string, endDate: string) {
    try {
        const res = await axios({
            method: 'GET',
            url: `${import.meta.env.VITE_BACKEND_URL}/orders/range-revenue`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
          params: {
                startDate: startDate,
                endDate: endDate
            }
        });
        return res.data;
    } catch (error) {
        console.error("Fetch range revenue error:", error);
        throw error;
    }
};


export async function Metric(token: string) {
    try {
        const res = await axios({
            method: 'GET',
            url: `${import.meta.env.VITE_BACKEND_URL}/orders/metrics`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        console.error("Fetch orders metrics error:", error);
        throw error;
    }
};
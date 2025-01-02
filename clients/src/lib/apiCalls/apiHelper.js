const apiRoot = import.meta.env.VITE_API_URL;

const apiRequest = async (url, method, body = null, headers = {}, useFormData = false) => {
    try {
        const options = {
            method,
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`,
                ...headers
            },
            credentials: 'include'
        };

        if (body) {
            if (useFormData) {
                options.body = body;
            } else {
                options.headers["Content-Type"] = "application/json";
                options.body = JSON.stringify(body);
            }
        }

        const response = await fetch(`${apiRoot}${url}`, options);
        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
};

export default apiRequest;

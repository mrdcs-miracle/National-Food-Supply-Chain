import axios from 'axios';

// Create a central instance
const api = axios.create({
    baseURL: 'http://localhost:8080/api', // Matches your Spring Boot Controller paths
    withCredentials: true, // 🟢 CRITICAL: Allows browser to send/receive the JWT Cookie
    headers: {
        'Content-Type': 'application/json',
    }
});

export default api;
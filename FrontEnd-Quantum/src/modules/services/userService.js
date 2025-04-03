import axios from "axios";
const API_URL = "http://127.0.0.1:8000"; // Update if your backend runs on another port
export const fetchAllUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/getallusers`);
        return response.data;
    }
    catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};
export const addUser = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/createuser`, formData);
        return response.data;
    }
    catch (error) {
        console.error("Error adding user:", error);
        throw error;
    }
};
export const deleteUser = async (userId) => {
    try {
        await axios.delete(`${API_URL}/deleteuser/${userId}`);
        console.log(`User with ID ${userId} deleted successfully.`);
    }
    catch (error) {
        console.error(`Error deleting user with ID ${userId}:`, error);
        throw error;
    }
};
export const updateUser = async (userId, userData) => {
    try {
        const response = await axios.put(`${API_URL}/updateuser/${userId}`, userData);
        return response.data;
    }
    catch (error) {
        console.error(`Error updating user with ID ${userId}:`, error);
        throw error;
    }
};
//# sourceMappingURL=userService.js.map
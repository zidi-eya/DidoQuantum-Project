import axios from "axios";
import type { User } from "../models/userModel";


const API_URL = "http://127.0.0.1:8000"; // Update if your backend runs on another port

export const fetchAllUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get<User[]>(`${API_URL}/getallusers`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const addUser = async (formData: FormData): Promise<User> => {
  try {
    const response = await axios.post<User>(`${API_URL}/createuser`, formData);
    return response.data;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};

export const deleteUser = async (userId: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/deleteuser/${userId}`);
    console.log(`User with ID ${userId} deleted successfully.`);
  } catch (error) {
    console.error(`Error deleting user with ID ${userId}:`, error);
    throw error;
  }
};



export const updateUser = async (userId: number, userData: Partial<User>): Promise<User> => {
  try {
    const response = await axios.put<User>(`${API_URL}/updateuser/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error(`Error updating user with ID ${userId}:`, error);
    throw error;
  }
};

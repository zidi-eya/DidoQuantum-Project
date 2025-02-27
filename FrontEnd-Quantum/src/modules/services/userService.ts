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

export const addUser = async (user: User): Promise<User> => {
  try {
    const response = await axios.post<User>(`${API_URL}/createuser`, user);
    return response.data;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};

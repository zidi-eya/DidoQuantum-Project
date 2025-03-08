<template>
  <div class="container">
    <h1>User Form</h1>

    <!-- User Input Form -->
    <form @submit.prevent="submitForm" class="user-form">
      <input v-model="user.name" placeholder="Name" required />
      <input v-model="user.email" placeholder="Email" required />
      <input v-model="user.role" placeholder="Role" required />
      <input type="file" @change="handleFileUpload" accept="image/*" required />
      <input v-model="user.status" placeholder="Role" required />

      <button type="submit">Add User</button>
    </form>

    <h2>Users List</h2>

    <!-- Display Users -->
    <table class="users-table">
      <thead>
        <tr>
          <th>Profile Image</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Status</th>
          <th>Created At</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>
            <img
              v-if="user.profile_image"
              :src="user.profile_image"
              alt="Profile"
              width="50"
              height="50"
            />
          </td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
          <td>{{ user.status }}</td>
          <td>{{ user.created_at }}</td>

          <td>
            <!--   <button @click="editUser(user.id)">Edit</button>-->
            <button
              v-if="user.id !== undefined"
              @click="deleteUserConfirmed(user.id)"
              style="background-color: brown"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { fetchAllUsers, addUser, deleteUser, updateUser } from "../services/userService";
import type { User } from "../models/userModel";
import axios from "axios";
const users = ref<User[]>([]);
const user = ref<User & { profile_image_file: File | null }>({
  // Added profile_image_file
  name: "",
  email: "",
  role: "",
  profile_image: "", // Keep this as string
  status: "",
  created_at: new Date(), // Initialize with current date and time

  profile_image_file: null, // New field for the uploaded file
});

// Fetch all users when the component is mounted
onMounted(async () => {
  try {
    users.value = await fetchAllUsers();
  } catch (error) {
    console.error("Failed to fetch users:", error);
  }
});

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    user.value.profile_image_file = target.files[0]; // Store the selected file correctly
  }
};

// Function to submit the form and add a new user
const submitForm = async () => {
  try {
    const formData = new FormData();
    formData.append("name", user.value.name);
    formData.append("email", user.value.email);
    formData.append("role", user.value.role);
    formData.append("status", user.value.status);

    // Instead of created_at, set it to the current date if the backend needs it
    formData.append("created_at", new Date().toISOString()); // Add the date as a string in ISO format

    // Attach the profile image if it exists
    if (user.value.profile_image_file) {
      formData.append("profile_image", user.value.profile_image_file);
    }

    // Send FormData to the addUser service
    const newUser = await addUser(formData);
    users.value.push(newUser); // Update the list

    // Reset form values
    user.value = {
      name: "",
      email: "",
      role: "",
      status: "",
      profile_image: "",
      profile_image_file: null,
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Error status:", error.response.status);
    } else {
      console.error("Error adding user:", error);
    }
  }
};

const deleteUserConfirmed = async (id: number) => {
  try {
    await deleteUser(id);
    users.value = users.value.filter((u) => u.id !== id);
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: auto;
  padding: 20px;
  text-align: center;
  border-radius: 8px;
}

.user-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.user-form input,
.user-form button {
  padding: 10px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #000000;
}

.users-table {
  width: 100%;
  border-collapse: collapse;
}

.users-table th,
.users-table td {
  border: 1px solid #000000;
  padding: 8px;
  text-align: left;
}

.users-table th {
  background-color: rgba(173, 221, 27, 0.703);
}

.users-table td button {
  margin-right: 5px;
  padding: 5px 10px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.users-table td button:hover {
  background-color: #2929ba;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input,
textarea {
  width: 100%;
  padding: 8px;
}

button {
  background-color: #28a745;
  color: rgb(0, 0, 0);
  border: none;
  padding: 10px;
  cursor: pointer;
}
</style>

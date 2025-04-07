<template>
  <div class="container">
    <h1>User Form</h1>

    <!-- User Input Form -->
    <form @submit.prevent="submitForm" class="user-form">
      <input v-model="user.name" placeholder="Name" required />
      <input v-model="user.email" placeholder="Email" required />
      <input v-model="user.role" placeholder="Role" required />
      <input type="file" @change="handleFileUpload" accept="image/*" required />
      <select v-model="user.status" required>
        <option value="" disabled>Select status</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>

      <button type="submit">Add User</button>
    </form>

    <!-- Success & Error Notification -->
    <transition name="toast-fade">
      <div v-if="isToastVisible" class="toast" :class="toastType">
        {{ toastMessage }}
      </div>
    </transition>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { fetchAllUsers, addUser, deleteUser, updateUser } from "../services/userService";
import type { User } from "../models/userModel";
import axios from "axios";
const users = ref<User[]>([]);
const isToastVisible = ref(false);
const toastMessage = ref("");
const toastType = ref("success"); // "success" or "error"
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

const submitForm = async () => {
 /* try {
    const formData = new FormData();
    formData.append("name", user.value.name);
    formData.append("email", user.value.email);
    formData.append("role", user.value.role);
    formData.append("status", user.value.status);
    formData.append("created_at", new Date().toISOString());

    if (user.value.profile_image_file) {
      formData.append("profile_image", user.value.profile_image_file);
    }

    const newUser = await addUser(formData);
    users.value.push(newUser);

    // Show success notification
    showToast("User added successfully!", "success");

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
      showToast("Error adding user: " + error.response.data.detail, "error");
    } else {
      console.error("Error adding user:", error);
      showToast("An unknown error occurred!", "error");
    }
  }*/
};

// Function to show toast notification
const showToast = (message: string, type: "success" | "error") => {
  toastMessage.value = message;
  toastType.value = type;
  isToastVisible.value = true;

  setTimeout(() => {
    isToastVisible.value = false;
  }, 3000); // Hide after 3 seconds
};
</script>

<style scoped>
/* Toast Notification */
.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 15px;
  border-radius: 5px;
  font-size: 16px;
  color: white;
  z-index: 1000;
}

/* Success & Error Colors */
.success {
  background-color: green;
}

.error {
  background-color: red;
}

/* Toast Fade Animation */
.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.toast-fade-enter,
.toast-fade-leave-to {
  opacity: 0;
}

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
.user-form select,
.user-form button {
  padding: 17px;
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

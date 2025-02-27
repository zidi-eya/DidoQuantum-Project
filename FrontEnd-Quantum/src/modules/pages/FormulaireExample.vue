<template>
  <div class="container">
    <h1>User Form</h1>

    <!-- User Input Form -->
    <form @submit.prevent="submitForm">
      <input v-model="user.firstname" placeholder="First Name" required />
      <input v-model="user.lastname" placeholder="Last Name" required />
      <input v-model="user.emil" placeholder="Email" required />
      <textarea v-model="user.description" placeholder="Description" required></textarea>
      <button type="submit">Add User</button>
    </form>

    <h2>Users List</h2>

    <!-- Display Users -->
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.firstname }} {{ user.lastname }} - {{ user.emil }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { fetchAllUsers, addUser } from "../services/userService";
import type { User } from "../models/userModel";

const users = ref<User[]>([]);
const user = ref<User>({ firstname: "", lastname: "", emil: "", description: "" });

// Fetch all users when the component is mounted
onMounted(async () => {
  try {
    users.value = await fetchAllUsers();
  } catch (error) {
    console.error("Failed to fetch users:", error);
  }
});

// Function to submit the form and add a new user
const submitForm = async () => {
  try {
    const newUser = await addUser(user.value);
    users.value.push(newUser); // Update the list
    user.value = { firstname: "", lastname: "", emil: "", description: "" }; // Reset form
  } catch (error) {
    console.error("Error adding user:", error);
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input, textarea {
  width: 100%;
  padding: 8px;
}

button {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}
</style>

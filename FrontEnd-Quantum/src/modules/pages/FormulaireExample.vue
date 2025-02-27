<template>
  <div class="container">
    <h1>User Form</h1>

    <!-- User Input Form -->
    <form @submit.prevent="submitForm" class="user-form">
      <input v-model="user.firstname" placeholder="First Name" required />
      <input v-model="user.lastname" placeholder="Last Name" required />
      <input v-model="user.emil" placeholder="Email" required />
      <textarea v-model="user.description" placeholder="Description" required></textarea>
      <button type="submit">Add User</button>
    </form>

    <h2>Users List</h2>

    <!-- Display Users -->
    <table class="users-table">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.firstname }}</td>
          <td>{{ user.lastname }}</td>
          <td>{{ user.emil }}</td>
          <td>{{ user.description }}</td>
          <td>
             <!--   <button @click="editUser(user.id)">Edit</button>-->
            <button v-if="user.id !== undefined" @click="deleteUserConfirmed(user.id)" style="background-color: brown;">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
.container {
  max-width: 900px;
  margin: auto;
  padding: 20px;

  border-radius: 8px;
}

.user-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.user-form input,
.user-form textarea,
.user-form button {
  padding: 10px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.users-table {
  width: 100%;
  border-collapse: collapse;
}

.users-table th,
.users-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.users-table th {
  background-color: #f1f1;
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
  background-color: #ddd;
}
</style>


<script setup lang="ts">
import { ref, onMounted } from "vue";
import { fetchAllUsers, addUser,deleteUser, updateUser  } from "../services/userService";
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


const deleteUserConfirmed = async (id: number) => {
  try {
    await deleteUser(id);
    users.value = users.value.filter(u => u.id !== id);
  } catch (error) {
    console.error("Error deleting user:", error);
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

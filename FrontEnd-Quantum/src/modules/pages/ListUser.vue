<template>
  <div class="container">
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
            <div style="display: flex; gap: 10px">
              <button
                v-if="user.id !== undefined"
                style="background-color: green"
                @click="openEditModal(user)"
              >
                Edit
              </button>
              <button
                v-if="user.id !== undefined"
                @click="confirmDeleteUser(user.id)"
                style="background-color: red"
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Edit User Modal -->
    <transition name="modal-fade">
      <div v-if="isEditModalOpen" class="modal-overlay">
        <div class="modal-popup">
          <h3>Edit User</h3>

          <label>Name:</label>
          <input v-model="editableUser.name" type="text" />

          <label>Email:</label>
          <input v-model="editableUser.email" type="email" />

          <label>Role:</label>
          <input v-model="editableUser.role" type="text" />

          <label>Status:</label>
          <input v-model="editableUser.status" type="text" />

          <div class="modal-buttons">
            <button @click="saveUserEdits" class="save-btn">Save Changes</button>
            <button @click="closeEditModal" class="cancel-btn">Cancel</button>
          </div>
        </div>
      </div>
    </transition>
    <!-- Delete Confirmation Modal -->
    <transition name="modal-fade">
      <div v-if="isDeleteModalOpen" class="modal-overlay">
        <div class="modal-popup">
          <h3>Are you sure you want to delete this user?</h3>
          <div class="modal-buttons">
            <button @click="deleteUserConfirmed" class="delete-confirm-btn">
              Yes, Delete
            </button>
            <button @click="closeDeleteModal" class="cancel-btn">Cancel</button>
          </div>
        </div>
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
const isEditModalOpen = ref(false);
const editableUser = ref<Partial<User>>({});
const isDeleteModalOpen = ref(false);
const userIdToDelete = ref<number | null>(null);
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
const openEditModal = (user: User) => {
  editableUser.value = { ...user }; // Clone user data to avoid modifying original list
  isEditModalOpen.value = true;
};
const closeEditModal = () => {
  isEditModalOpen.value = false;
  editableUser.value = {};
};
const saveUserEdits = async () => {
  if (!editableUser.value.id) return;
  try {
    const updatedUser = await updateUser(editableUser.value.id, editableUser.value);
    users.value = users.value.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    closeEditModal();
  } catch (error) {
    console.error("Error updating user:", error);
  }
};

const confirmDeleteUser = (id: number) => {
  userIdToDelete.value = id;
  isDeleteModalOpen.value = true;
};

const closeDeleteModal = () => {
  isDeleteModalOpen.value = false;
  userIdToDelete.value = null;
};

const deleteUserConfirmed = async () => {
  if (userIdToDelete.value === null) return;
  try {
    await deleteUser(userIdToDelete.value);
    users.value = users.value.filter((u) => u.id !== userIdToDelete.value);
    closeDeleteModal();
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};
</script>

<style scoped>
/* Modal Background */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* Modal Popup Box */
.modal-popup {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  text-align: center;
  position: relative;
  animation: popup 0.3s ease-in-out;
}

/* Close Button */
.modal-buttons {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
}

.save-btn {
  background-color: green;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.cancel-btn {
  background-color: red;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

/* Modal Fade In/Out Animation */
@keyframes popup {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

/**/

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
  background-color: rgba(43, 78, 195, 0.703);
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

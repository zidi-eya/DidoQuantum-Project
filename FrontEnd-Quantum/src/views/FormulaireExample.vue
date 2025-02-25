<template>
  <div class="register-container">
    <h2>Register</h2>
    <form @submit.prevent="registerUser">
      <input v-model="name" type="text" placeholder="Name" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      message: "",
    };
  },
  methods: {
    async registerUser() {
      try {
        const response = await axios.post("http://127.0.0.1:8000/register", {
          name: this.name,
          email: this.email,
          password: this.password,
        });
        this.message = response.data.message;
      } catch (error) {
        this.message = "Error registering user.";
      }
    },
  },
};
</script>

<style scoped>
.register-container {
  max-width: 300px;
  margin: auto;
  text-align: center;
}

input {
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
}

button {
  background-color: #42b883;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
}
</style>

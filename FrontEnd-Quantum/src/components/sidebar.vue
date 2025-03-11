<template>
  <div id="app" style="display: flex">
    <div class="sidebar">
      <img
        src="/home/eya/Dido-Quantum/BackEnd-Quantum/uploads/qt=q_95.webp"
        alt="Logo"
        height="150"
        class="q-mr-sm"
        style="margin-left: 50px"
      />
      <router-link to="/" class="button">Add User </router-link>
      <router-link to="/ListUser" class="button">View List User</router-link>
      <div>
        <p style="position: fixed; bottom: 1px">
          Copyright © 2025 Dido Quantum Pulse <br />
          All Rights Reserved.
        </p>
      </div>
    </div>
    <div class="content">
      <!--<router-view></router-view>-->
    </div>
  </div>
</template>

<style>
#app {
  font-family: Arial, sans-serif;
}

.sidebar {
  width: 300px;
  background-color: #381fc4;
  padding: 15px;
  height: 100vh;
  box-sizing: border-box;
  position: fixed; /* Fixes the sidebar to the left */
  top: 0; /* Aligns the sidebar to the top */
  left: 0;
}

.button {
  display: block;
  padding: 10px;
  margin: 5px 0;
  color: white;
  background-color: #0e0f5b;
  text-decoration: none;
}

.button:hover {
  background-color: #575757;
}

.content {
  padding: 20px;
  flex-grow: 1;
}
</style>

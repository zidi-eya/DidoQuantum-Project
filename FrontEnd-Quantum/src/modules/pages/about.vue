

<template>


  <div class="navbar">
    <div class="logo">
      <app-logo class="q-mb-xl" />
    </div>
    <div class="nav-links">
      <a href="#">Our offers</a>
      <a href="#">Features</a>
      <a href="#">Contact</a>
      <a href="#">Sign in</a>
    </div>
      <q-btn           color="primary"
      rounded  class="q-pa-md q-my-lg "
      label="Get Started Now"></q-btn>
  </div>

  <div class="contact-us">
    <h2 class="contact-title">About Us</h2>
    <p class="contact-description">
      Welcome to Dido Quantum, where we harness the power of quantum science to redefine security, identity, and communication. Our mission is to build groundbreaking technologies that merge quantum sensing, biometric intelligence, and advanced cryptography to create safer, smarter systems for the future of aviation and beyond.
    </p>
  </div>

  <q-card class="custom-card">
    <q-separator inset />
    <q-card-section class="column q-px-md preview-card">
      <div class="contentN">
        <div class="contentN-container">

          <div class="contentN-image">
            <img src="/image/rs=w_1024,h_512,cg_true.webp" alt="image description" />
          </div>
          <div class="content-textN" style="margin-left: 10px;">
            <h4> What is EntangleBeat™?</h4>
            <p>
              EntangleBeat™ is an innovative biometric authentication and pilot monitoring system that uses quantum sensing technology to analyze a pilot’s electromagnetic heartbeat signature in real time. By converting these biological signals into quantum wavefunctions and encoding them as qubits, the system ensures continuous identity verification and stress detection. If signs of distress or biometric incoherence are detected—such as during a hijack or medical emergency—the system can trigger a secure override, disabling cockpit controls and alerting ground authorities. This represents a paradigm shift in aviation security, integrating biometric coherence and quantum cryptography for unprecedented safety.            </p>
          </div>

        </div>
      </div>
    </q-card-section>
  </q-card>
  <br/><br/>

  <q-card class="custom-card">
    <q-separator inset />
    <q-card-section class="column q-px-md preview-card">
      <div class="contentN">
        <div class="contentN-container">
          <div class="content-textN">
            <h4> Quantum Security Meets Aviation</h4>
            <p>
              The EntangleBeat™ system combines advanced quantum technologies such as Schrödinger-based modeling, Qubit encoding, and Quantum Key Distribution (QKD) to establish a zero-trust communication channel between aircraft and ground control. A seat-embedded quantum sensor captures the pilot’s cardiac electromagnetic signals and entangles them with a stored baseline for real-time validation. In parallel, it supports spoof-proof aircraft tracking and secure data handover across regions using entangled positioning and QKD laser transmission. This cutting-edge approach bridges quantum science, aerospace engineering, and cybersecurity to deliver a robust, intelligent security layer for modern aviation.
            </p>
          </div>
          <div class="contentN-image">
            <img src="/image/rs=w_2560,h_1360.webp" alt="image description" />
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
<br/><br/>

  <q-card class="custom-card">
    <q-separator inset />
    <q-card-section class="column q-px-md preview-card">
      <div class="contentN">
        <div class="contentN-container">

          <div class="contentN-image">
            <img src="/image/rs=w_984,h_689.webp" alt="image description" />
          </div>
          <div class="content-textN" style="margin-left: 10px;">
            <h4> Dido Quantum Pulse: Bridging Innovation with AI-Powered Intelligence</h4>
            <p>
              Dido Quantum Pulse envisions a global AI-powered digital innovation marketplace that bridges the gap between enterprises, government agencies, and cutting-edge technology innovators. By leveraging AI-driven matchmaking, blockchain-based licensing, and enterprise-level security compliance (GDPR & FedRAMP), the platform will accelerate technological discovery, ensuring that the most advanced solutions reach the right partners efficiently.ur Mission
            </p>
          </div>

        </div>
      </div>
    </q-card-section>
  </q-card>

  <div class="footer">
    <div class="footer-credits">
      <app-logo class="q-mb-xl" />

    </div>
    <div class="footer-links">
      <a href="#" class="footer-link">Terms & Conditions</a>
      <a href="#" class="footer-link">Privacy Policy</a>
      <a href="#" class="footer-link">Documentation & Tutorials</a>
      <a href="#" class="footer-link">Blog</a>
      <a href="#" class="footer-link">Become an affiliate</a>
    </div>

  </div>
</template>
<script setup lang="ts">

  import AppLogo from '@/components/AppLogo.vue';

</script>
<style lang="scss">

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
}

.nav-links {
  flex: 1 1 auto; /* Utilise l'espace restant pour nav links */
  display: flex;
  justify-content: center;
}

.nav-links a {
  margin: 0 15px;
  text-decoration: none;
}

.button {
  flex: 0 0 auto; /* Fixe l'espace pour le bouton */
}
 </style>
 <style lang="sass" scoped>

 body
  display: flex
  justify-content: center // Center horizontally
  align-items: center // Center vertically
  height: 100vh // Full height of the viewport
  margin: 0 // Reset default body margin

 .preview-card
   border-radius: 8px
   border: 1px solid #e0e0e0
   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1)
   max-width: 70%
   padding: 20px
   margin-left: 15%
   margin-right: 15%


.contentN-container
   display: flex
   align-items: center // Aligns items vertically in the center

.content-textN
   width: 45%
   font-size: 1.2em
   line-height: 1.8em
   color: #333


.contact-us
   text-align: center // Center-align the text
   margin: 40px 0 // Space around the section

.contact-title
   font-size: 2em // Larger font size for emphasis
   color: #FF6A00 // Example color, change as needed
   margin-bottom: 10px // Space between title and paragraph

.contact-description
   font-size: 1.2em // Slightly larger font for clarity
   color: #333 // Darker text for readability
   max-width: 600px // Limit the width for better readability
   margin: 0 auto // Center it horizontally

.contentN-image
   width: 50%
   align-items: center // Aligns items vertically in the center


   img
     width: 100% // Ensures the image scales properly within its container




.footer
    background-color: #f1f1f1 // Light background for contrast
    padding: 20px 0 // Vertical padding
    text-align: center // Center-align text
    margin-top: 40px // Space from previous sections

.footer-links
    display: flex
    flex-wrap: wrap // Allow links to wrap on small screens
    justify-content: center // Center the links
    gap: 20px // Space between links

.footer-link
    text-decoration: none // Remove underline
    color: #333 // Dark color for readability

.footer-link:hover
    text-decoration: underline // Underline on hover for better UX

 </style>

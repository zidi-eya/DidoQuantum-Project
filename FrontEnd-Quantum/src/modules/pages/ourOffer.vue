

<template>


  <div class="navbar">
    <div class="logo">
      <app-logo class="q-mb-xl" />
    </div>
    <div class="nav-links">
      <a href="/offer">Our offers</a>
      <a href="/about">About</a>
      <a   href="/contact">Contact</a>

    </div>
      <q-btn
      color="primary"
      rounded  class="q-pa-md q-my-lg "
      label="Get Started Now"
      @click="router.push({ name: RouteNames.SIGN_IN })"

      ></q-btn>
  </div>

  <div class="contact-us">
    <h2 class="contact-title">What we Offer</h2>
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
            <img src="/image/qtpulse.webp" alt="image description" />
          </div>
          <div class="content-textN" style="margin-left: 10px;">
            <h4> What Dido Quantum Pulse Offer
              ?</h4>
            <p>
              Dido Quantum Pulse is an AI-powered digital innovation marketplace designed to:
             <br/> ✅ Match enterprises & governments with cutting-edge AI & quantum solutions.
             <br/> ✅ Provide a secure platform for AI startups & researchers to commercialize innovations.
             <br/> ✅ Accelerate the adoption of AI-driven cybersecurity, fintech, and cloud-based quantum computing.

             <br/> We focus on three main pillars:
             <br/>- AI & Quantum Research Commercialization
             <br/>– Helping AI & quantum researchers patent, license, and monetize their discoveries.
             <br/> -Secure AI Adoption & GovTech Innovation
             <br/>  – Enabling government agencies & enterprises to implement AI safely.
             <br/>- Quantum-Secured Networking & AI-driven Cybersecurity
             <br/> – Building Quantum VPN (QVPN) solutions & AI-enhanced security infrastructures        </p>    </div>

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
            <h4>  What We Offer</h4>
            <p>
              <br/>🔹 AI-Powered Innovation Marketplace
              A secure, intelligent platform where businesses, startups, and research institutions showcase and commercialize AI, IT, telecom, and cybersecurity solutions.

              <br/> 🔹 Hybrid Quantum Synchronization (HQS)
              A revolutionary quantum-secure synchronization technology designed for 6G, AI-powered networks, cybersecurity, and blockchain-based data integrity.

              <br/> 🔹 AI & GovTech Solutions
              Enterprise and public-sector AI adoption strategies, compliance solutions (GDPR, FedRAMP), and AI-driven digital transformation.

              <br/> 🔹 Blockchain-Based Licensing & IP Protection
              Advanced blockchain smart contracts for secure, fair, and efficient licensing of AI-driven software, patents, and digital innovations.            </p>
          </div>
          <div class="contentN-image">
            <img src="/image/rs=w_984,h_689.webp    " alt="image description" />
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
        <h5 style="margin-left: 120px;"> The Future of AI, Quantum, and Secure Telecommunications Starts Here!</h5>

        <div class="contentN-container">

          <div class="contentN-image">
            <img src="/image/rs=w_2560,h_1360.webp" alt="image description" />
          </div>
          <div class="content-textN" style="margin-left: 10px;">
            <p>


              🤝 Partner with Us
              Dido Quantum Pulse is actively seeking strategic partnerships, investors, and enterprise collaborations to accelerate the future of AI-powered innovation, secure telecom infrastructure, and post-quantum cybersecurity.

              <br/>   📌 How You Can Collaborate with Us
              <br/>   🔹 Enterprises & Governments – Looking for cutting-edge AI & telecom solutions? We provide secure, scalable, and innovative technology adoption strategies.
              <br/>   🔹 Investors & VC Firms – Join us in funding the next wave of AI-powered digital transformation and quantum-secure telecom.
              <br/>🔹 Tech Innovators & Researchers – Showcase your breakthrough solutions on our AI-powered marketplace and connect with global enterprises.
              <br/> 🔹 Media & Conference Organizers – Invite Chokri Ouali as a speaker, panelist, or expert contributor on AI, cybersecurity, and quantum tech.

            <!--  📅 Schedule a Meeting → [Insert Calendar Link] (Optional if you have an online booking system)

              📩 For business inquiries, partnerships, or media requests, contact us at:
              📧 Email: chokriouali@didoquantumpulse.com
              🌐 Website: www.didoquantumpulse.com
              📍 Location: Belgium, Germany, U.S. (Arizona LLC)

              🔗 Connect with Chokri Ouali     -->       </p>
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
      <a href="/about" class="footer-link">About</a>
      <a href="/offer" class="footer-link">Offers</a>
      <a href="/contact" class="footer-link">Contact</a>
    </div>

  </div>
</template>
<script setup lang="ts">

  import AppLogo from '@/components/AppLogo.vue';
  import { QBtn, QInput,QForm, QIcon } from 'quasar'
  import RouteNames from '@/modules/auth/router/RouteNames';
  import { useRouter } from 'vue-router';

  const router = useRouter();

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



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
    <h2 class="contact-title">Contact Us</h2>
    <p class="contact-description">


      You have question about Dido Quantum or want to connect with us?

      Book a call with the team or contact us by email.



    </p>
  </div>



  <div class="contact-info">
    <h2 class="contact-title">Proudly developed in Belgium</h2>
    <div class="contact-cards">
      <div class="contact-card">
        <div class="contact-icon">📍</div> <!-- Use an actual icon or icon font here -->
        <div class="contact-details">Address<br>Counts-Saint-Michel 348,<br>Sourcem Building - H1,<br>1000 Brussels</div>
      </div>
      <div class="contact-card">
        <div class="contact-icon">✉️</div>
        <div class="contact-details">Send us an email<br><a href="mailto:contact@dido.com">contact@dido.com</a></div>
      </div>
      <div class="contact-card">
        <div class="contact-icon">📞</div>
        <div class="contact-details">Give us a call<br>+32 58 56 26 21</div>
      </div>
    </div>
  </div>


  <br/><br/>

  <q-card class="custom-card">
    <q-separator inset />
    <q-card-section class="column q-px-md preview-card">
      <div class="contentN">
        <div class="contentN-container">
          <div >
            <h4> Quantum Security Meets Aviation</h4>
            <p>
              The EntangleBeat™ system combines advanced quantum technologies such as Schrödinger-based modeling, Qubit encoding, and Quantum Key Distribution (QKD) to establish a zero-trust communication channel between aircraft and ground control. A seat-embedded quantum sensor captures the pilot’s cardiac electromagnetic signals and entangles them with a stored baseline for real-time validation. In parallel, it supports spoof-proof aircraft tracking and secure data handover across regions using entangled positioning and QKD laser transmission. This cutting-edge approach bridges quantum science, aerospace engineering, and cybersecurity to deliver a robust, intelligent security layer for modern aviation.
            </p>
          </div>

        </div>
      </div>
    </q-card-section>
  </q-card>
<br/><br/>



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






.contact-info
    text-align: center // Center the text
    margin: 40px 0 // Space from other sections

.contact-title
    font-size: 2em // Emphasize title size
    color: #333 // Dark color for readability

.contact-cards
    display: flex
    justify-content: center // Center cards
    gap: 30px // Space between cards
    flex-wrap: wrap // Allow wrapping on small screens

.contact-card
    background-color: #f9f9f9 // Light background for contrast
    border: 1px solid #e0e0e0
    padding: 20px
    border-radius: 8px
    max-width: 200px // Set a max width for the cards

.contact-icon
    font-size: 24px // Size of the icon
    margin-bottom: 10px // Space below the icon

.contact-details
    font-size: 16px // Standard font size
    color: #333 // Dark color for readability

 </style>

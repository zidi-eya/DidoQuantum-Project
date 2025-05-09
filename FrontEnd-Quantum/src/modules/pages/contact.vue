

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
      />
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
        <div class="contact-details">Belgium, Germany, <br>U.S. (Arizona LLC)</div>
      </div>
      <div class="contact-card">
        <div class="contact-icon">✉️</div>
        <div class="contact-details">Send us an email<br><a href="mailto:contact@dido.com"> info@didoquantumpulse.com

        </a></div>
      </div>
      <div class="contact-card">
        <div class="contact-icon">📞</div>
        <div class="contact-details">Give us a call<br>+32 493 531 183</div>
      </div>
    </div>
  </div>

  <br/><br/>

  <q-card class="custom-card">
    <q-separator inset />
    <q-card-section class="column q-px-md preview-card">
      <div class="contentN">
        <div class="contentN-container">
          <div  class="content-textN">
            <q-form greedy class="q-gutter-md full-width" >

              <q-input
                class="full-width"
                standout="bg-primary text-white"
                v-model="fullName"
                label="Full name"
                lazy-rules="ondemand"
                :rules="GeneralRules.fieldRequired('Please enter your full name')"
                hide-bottom-space
            >
            <template v-slot:prepend>
              <q-icon name="eva-person-outline" />
            </template>
              </q-input>

              <q-input
                class="full-width"
                standout="bg-primary text-white"
                v-model="email"
                label="Email"
                lazy-rules="ondemand"
                :rules="AuthRules.email"
                hide-bottom-space
              >
                <template v-slot:prepend>
                  <q-icon name="eva-email-outline" />
                </template>
              </q-input>

              <q-input
                label="Description"
                v-model="description"
                color="primary"
                type="textarea"
                rows="10"
                outlined
                placeholder="Tell us about your project"
                lazy-rules="ondemand"
                :rules="GeneralRules.fieldRequired('Please enter a description')"
                hide-bottom-space
              >
                <template v-slot:prepend>
                  <q-icon name="eva-book-outline" />
                </template>
              </q-input>

              <q-btn
              class="q-pa-md q-my-lg full-width"
              rounded
              label="Send"
              type="submit"
              color="primary"
              icon-right="eva-log-in-outline"
               />

            </q-form >

          </div>
          <div  class="contentN-image" style="margin-left:30px ;">

              <h4>Questions or Comments?</h4>
              <p>We know that our clients have unique needs. Send us a message, and we will get back to you soon.</p>

              <p> Dido Quantum Pulse <br/>
              East Doubletree Ranch Road, Scottsdale, Arizona 85258, United States
              </p>

              <h6>Hours</h6>
                  Mon : 09:00 – 17:00 <br/>

                  Tues : 09:00 – 17:00 <br/>

                  Wed : 09:00 – 17:00 <br/>

                  Thu : 09:00 – 17:00<br/>

                  Fri : 09:00 – 17:00<br/>

                  Sat : Closed <br/>

                  Sun : Closed <br/>


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
      <a href="/about" class="footer-link">About</a>
      <a href="/offer" class="footer-link">Offers</a>
      <a href="/contact" class="footer-link">Contact</a>
    </div>

  </div>
</template>
<script setup lang="ts">
import { AuthRules, GeneralRules } from '@/utils/validation/rules';
import AppLogo from '@/components/AppLogo.vue';
import { ref, onMounted } from 'vue';
import { QBtn, QInput,QForm, QIcon } from 'quasar'
import { useExceptionHandling } from '@/composables/exception-handling';
import RouteNames from '@/modules/auth/router/RouteNames';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const email = ref('');
  const description= ref('');
  const fullName=ref('');
  const { safeExecute, errors } = useExceptionHandling();
  const fileUpload = ref();






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
    width: 400px // Set a max width for the cards

.contact-icon
    font-size: 24px // Size of the icon
    margin-bottom: 10px // Space below the icon

.contact-details
    font-size: 16px // Standard font size
    color: #333 // Dark color for readability

 </style>

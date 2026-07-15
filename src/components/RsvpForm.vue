<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { saveRsvp, getRsvp, type RsvpResponse } from '../services/rsvpService';
import { invitationConfig } from '../config/invitation';

const form = ref<RsvpResponse>({
  name: '',
  attendees: 1,
  status: '',
  message: ''
});

const isSubmitted = ref(false);
const error = ref('');

onMounted(() => {
  const existing = getRsvp();
  if (existing) {
    form.value = existing;
    isSubmitted.value = true;
  }
});

const handleSubmit = () => {
  error.value = '';
  
  if (!form.value.name.trim()) {
    error.value = 'Please enter your name.';
    return;
  }
  
  if (!form.value.status) {
    error.value = 'Please select your attendance status.';
    return;
  }
  
  if (form.value.attendees < 1) {
    error.value = 'Number of attendees must be at least 1.';
    return;
  }

  saveRsvp(form.value);
  isSubmitted.value = true;
};

const resetForm = () => {
  isSubmitted.value = false;
};
</script>

<template>
  <section class="rsvp-section" v-if="invitationConfig.features.rsvpEnabled">
    <div class="rsvp-card">
      <h2>RSVP</h2>
      
      <div v-if="isSubmitted" class="success-message">
        <p>Thank you! Your response has been received.</p>
        <p class="names">{{ invitationConfig.couple.groomName }} and {{ invitationConfig.couple.brideName }} look forward to celebrating with you.</p>
        <button class="btn-text" @click="resetForm">Update Response</button>
      </div>
      
      <form v-else @submit.prevent="handleSubmit" class="rsvp-form">
        <div class="form-group">
          <label for="guestName">Guest Name</label>
          <input 
            type="text" 
            id="guestName" 
            v-model="form.name" 
            placeholder="Please enter your full name"
            required
          />
        </div>
        
        <div class="form-group">
          <label>Attendance</label>
          <div class="radio-group">
            <label class="radio-label">
              <input type="radio" v-model="form.status" value="Joyfully Accepts" required>
              <span>Joyfully Accepts</span>
            </label>
            <label class="radio-label">
              <input type="radio" v-model="form.status" value="Regretfully Declines">
              <span>Regretfully Declines</span>
            </label>
          </div>
        </div>
        
        <div class="form-group" v-if="form.status === 'Joyfully Accepts'">
          <label for="attendees">Number of Attendees</label>
          <select id="attendees" v-model.number="form.attendees">
            <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="message">Message for the Couple (Optional)</label>
          <textarea 
            id="message" 
            v-model="form.message" 
            rows="3" 
            placeholder="Write a message..."
          ></textarea>
        </div>
        
        <p v-if="error" class="error-msg">{{ error }}</p>
        
        <button type="submit" class="btn-primary submit-btn">Send RSVP</button>
      </form>
    </div>
  </section>
</template>

<style scoped lang="scss">
.rsvp-section {
  padding: 4rem 2rem;
  background-color: var(--color-champagne);
}

.rsvp-card {
  max-width: 450px;
  margin: 0 auto;
  background-color: var(--color-ivory);
  padding: 2.5rem 2rem;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  text-align: center;
  
  h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
    color: var(--color-sage);
  }
}

.form-group {
  margin-bottom: 1.5rem;
  text-align: left;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    color: var(--color-brown-soft);
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  input[type="text"], select, textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid var(--color-sage-light);
    border-radius: 6px;
    background-color: rgba(255, 255, 255, 0.5);
    font-family: var(--font-sans);
    font-size: 1rem;
    color: var(--color-brown-soft);
    
    &:focus {
      outline: none;
      border-color: var(--color-sage);
    }
  }
}

.radio-group {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  text-transform: none !important;
  letter-spacing: 0 !important;
  
  input[type="radio"] {
    accent-color: var(--color-sage);
    width: 18px;
    height: 18px;
  }
}

.submit-btn {
  width: 100%;
  margin-top: 1rem;
}

.error-msg {
  color: #d9534f;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.success-message {
  padding: 2rem 0;
  
  p {
    font-size: 1.1rem;
    margin-bottom: 1rem;
    
    &.names {
      font-weight: 600;
      color: var(--color-sage);
    }
  }
}

.btn-text {
  margin-top: 1.5rem;
  color: var(--color-sage);
  text-decoration: underline;
  font-size: 0.9rem;
}
</style>

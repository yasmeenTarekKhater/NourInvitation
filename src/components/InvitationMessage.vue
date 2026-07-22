<script setup lang="ts">
import { invitationConfig } from '../config/invitation';
</script>

<template>
  <section class="invitation-message">
    <div class="message-content">
      <p>
        With hearts full of love and joy, we invite you to celebrate the beginning of our new journey together.
      </p>
      <p>
        Your presence will make our special day even more meaningful and unforgettable.
      </p>
      <p>
        Please join us for a beautiful evening filled with love, happiness, laughter, and lasting memories.
      </p>
      
      <div class="signature">
        {{ invitationConfig.couple.groomName }} <br/> & <br/> {{ invitationConfig.couple.brideName }}
      </div>
      
      <p class="closing">
        {{ invitationConfig.messages.closing }}
      </p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.invitation-message {
  padding: 5rem 2rem;
  background-color: var(--color-ivory);
  text-align: center;
  position: relative;
}

.message-content {
  max-width: 500px;
  margin: 0 auto;
  
  p {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 1.5rem;
    font-style: italic;
    
    &.closing {
      font-style: normal;
      font-size: 1rem;
      color: var(--color-sage);
      margin-top: 2rem;
      letter-spacing: 1px;
    }
  }
}

.signature {
  font-size: 3rem;
  color: var(--color-gold);
  margin: 3rem 0 1rem;
}
</style>

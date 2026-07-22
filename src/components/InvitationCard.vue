<script setup lang="ts">
import { ref } from 'vue';
import { invitationConfig } from '../config/invitation';

const cardRef = ref<HTMLElement | null>(null);

defineExpose({ cardRef });
</script>

<template>
  <div class="invitation-card" ref="cardRef">
    <div class="card-content">
      <p class="intro">{{ invitationConfig.messages.introduction }}</p>
      
      <div class="couple-names">
        <span>{{ invitationConfig.couple.groomName }}</span>
        <span class="ampersand">&</span>
        <span>{{ invitationConfig.couple.brideName }}</span>
      </div>
      
      <p class="invitation-text">{{ invitationConfig.messages.invitation }}</p>
      
      <div class="details">
        <p class="date">{{ invitationConfig.wedding.formattedDate }}</p>
        <p class="time">{{ invitationConfig.wedding.formattedTime }}</p>
      </div>
      
      <div class="venue-info">
        <p class="venue-name">{{ invitationConfig.venue.name }}</p>
        <p>{{ invitationConfig.venue.organization }}</p>
        <p>{{ invitationConfig.venue.city }}, {{ invitationConfig.venue.country }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.invitation-card {
  width: 100%;
  height: auto;
  min-height: 500px;
  background-color: var(--color-ivory);
  border-radius: 8px;
  box-shadow: 0 -5px 15px rgba(0,0,0,0.1);
  padding: 2rem 1.5rem;
  text-align: center;
  position: relative;
  // Starting state for GSAP
  opacity: 0;
  
  &::before {
    content: '';
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 10px;
    border: 1px solid var(--color-gold);
    border-radius: 4px;
    opacity: 0.3;
  }
}

.card-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.intro {
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--color-sage);
}

.couple-names {
  font-size: 2.2rem;
  line-height: 1.2;
  color: var(--color-gold);
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  
  .ampersand {
    font-size: 2rem;
    color: var(--color-brown-soft);
  }
}

.invitation-text {
  font-style: italic;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
}

.details {
  margin-bottom: 1.5rem;
  
  .date {
    font-size: 1.2rem;
    font-weight: 600;
  }
  
  .time {
    font-size: 1.1rem;
    color: var(--color-sage);
  }
}

.venue-info {
  font-size: 0.95rem;
  line-height: 1.4;
  
  .venue-name {
    font-weight: 600;
  }
}
</style>

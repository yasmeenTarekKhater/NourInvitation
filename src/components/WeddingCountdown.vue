<script setup lang="ts">
import { ref, onMounted } from 'vue';
import gsap from 'gsap';
import { useCountdown } from '../composables/useCountdown';
import { invitationConfig } from '../config/invitation';

const { days, hours, minutes, seconds, isExpired } = useCountdown();

const floatingElementsRef = ref<HTMLElement | null>(null);
const shapes = ['✿', '♥', '❀', '♡'];

onMounted(() => {
  if (!floatingElementsRef.value) return;
  const items = floatingElementsRef.value.querySelectorAll('.floating-item');
  
  items.forEach((item) => {
    gsap.to(item, {
      y: '-150vh', // Move from bottom past top
      x: 'random(-50, 50)',
      rotation: 'random(-180, 180)',
      duration: 'random(10, 20)',
      repeat: -1,
      ease: 'none',
      delay: 'random(0, 10)'
    });
  });
});
</script>

<template>
  <section class="countdown-section">
    <div class="floating-elements" ref="floatingElementsRef">
      <div v-for="i in 20" :key="i" class="floating-item" :style="{
        left: `${Math.random() * 100}%`,
        bottom: '-50px',
        fontSize: `${Math.random() * 1 + 1}rem`,
        opacity: Math.random() * 0.3 + 0.1
      }">
        {{ shapes[i % shapes.length] }}
      </div>
    </div>
    
    <h2 class="title">{{ invitationConfig.messages.countdownTitle }}</h2>
    
    <div v-if="isExpired" class="expired-message">
      <p class="cursive">Today is our special day!</p>
    </div>
    
    <div v-else class="countdown-grid">
      <div class="time-card">
        <span class="number">{{ days }}</span>
        <span class="label">Days</span>
      </div>
      <div class="time-card">
        <span class="number">{{ hours }}</span>
        <span class="label">Hours</span>
      </div>
      <div class="time-card">
        <span class="number">{{ minutes }}</span>
        <span class="label">Minutes</span>
      </div>
      <div class="time-card">
        <span class="number">{{ seconds }}</span>
        <span class="label">Seconds</span>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.countdown-section {
  padding: 4rem 2rem;
  text-align: center;
  background-color: var(--color-champagne);
  position: relative;
  overflow: hidden;
}

.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.floating-item {
  position: absolute;
  color: var(--color-sage);
}

.title {
  position: relative;
  z-index: 2;
  font-size: 1.8rem;
  margin-bottom: 2rem;
  color: var(--color-sage);
}

.expired-message {
  position: relative;
  z-index: 2;
  font-size: 2.5rem;
  color: var(--color-gold);
  padding: 2rem;
}

.countdown-grid {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  max-width: 400px;
  margin: 0 auto;
  
  @media (min-width: 480px) {
    grid-template-columns: repeat(4, 1fr);
  }
}

.time-card {
  background-color: var(--color-ivory);
  padding: 1.5rem 1rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.03);
  display: flex;
  flex-direction: column;
  align-items: center;
  
  .number {
    font-size: 2rem;
    font-weight: 600;
    color: var(--color-brown-soft);
    line-height: 1;
    margin-bottom: 0.5rem;
  }
  
  .label {
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--color-sage);
  }
}
</style>

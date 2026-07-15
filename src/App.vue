<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import WeddingIntro from './components/WeddingIntro.vue';
import WeddingCountdown from './components/WeddingCountdown.vue';
import VenueSection from './components/VenueSection.vue';
import InvitationMessage from './components/InvitationMessage.vue';
import MusicControl from './components/MusicControl.vue';
import { invitationConfig } from './config/invitation';

gsap.registerPlugin(ScrollTrigger);

const isIntroDone = ref(false);

const handleIntroCompleted = () => {
  isIntroDone.value = true;
};

// Wait for sections to mount then set up scroll animations
watch(isIntroDone, async (done) => {
  if (!done) return;
  await nextTick();

  // Animate each section when it enters the viewport
  gsap.utils.toArray<HTMLElement>('.scroll-section').forEach((section) => {
    gsap.fromTo(
      section,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  });
});
</script>

<template>
  <main class="container">
    <WeddingIntro @intro-completed="handleIntroCompleted" />
    
    <div class="main-content" v-if="isIntroDone">
      <div class="scroll-section"><WeddingCountdown /></div>
      <div class="scroll-section"><VenueSection /></div>
      <div class="scroll-section"><InvitationMessage /></div>
    </div>

    <MusicControl :autoPlayAllowed="true" v-if="invitationConfig.features.musicEnabled" />
  </main>
</template>

<style lang="scss">
.main-content {
  opacity: 0;
  animation: fadeIn 1.5s ease forwards;
}

.scroll-section {
  opacity: 0; // initial state before GSAP takes over
}

@keyframes fadeIn {
  to { opacity: 1; }
}
</style>

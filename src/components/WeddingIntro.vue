<script setup lang="ts">
import { ref, onMounted } from 'vue';
import gsap from 'gsap';
import FloatingPetals from './FloatingPetals.vue';
import EnvelopeInvitation from './EnvelopeInvitation.vue';
import InvitationCard from './InvitationCard.vue';
import { useInvitationAnimation } from '../composables/useInvitationAnimation';
import { invitationConfig } from '../config/invitation';
import castelImg from '../assets/castel.png';

const emit = defineEmits<{
  (e: 'intro-completed'): void;
}>();

const { playOpeningSequence, isOpened } = useInvitationAnimation();

const envelopeCompRef = ref<InstanceType<typeof EnvelopeInvitation> | null>(null);
const cardCompRef = ref<InstanceType<typeof InvitationCard> | null>(null);
const bgRef = ref<HTMLElement | null>(null);
const introTextRef = ref<HTMLElement | null>(null);
const introContentRef = ref<HTMLElement | null>(null);

onMounted(() => {
  if (introContentRef.value) {
    gsap.fromTo(introContentRef.value, 
      { opacity: 0, y: 60 }, 
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.5 }
    );
  }
});

const handleOpen = () => {
  if (introTextRef.value) {
    introTextRef.value.style.display = 'none'; // Hide text when animation starts
  }
  
  playOpeningSequence(
    envelopeCompRef.value?.envelopeTopRef || null,
    envelopeCompRef.value?.envelopeRef || null,
    cardCompRef.value?.cardRef || null,
    bgRef.value,
    () => emit('intro-completed')
  );
};

const handleSkip = () => {
  emit('intro-completed');
};
</script>

<template>
  <div class="intro-section" :class="{ 'is-opened': isOpened }">
    <div class="bg-layer" ref="bgRef">
      <img
        :src="castelImg"
        alt=""
        fetchpriority="high"
        decoding="async"
        style="width: 100%; height: 100%; object-fit: cover;"
      />
    </div>
    
    <FloatingPetals />
    
    <div class="intro-content" ref="introContentRef">
      <div class="intro-text" ref="introTextRef" v-if="!isOpened">
        <h2>Open Our Invitation</h2>
        <p class="names">{{ invitationConfig.couple.displayName }}</p>
        <p class="tap-hint">(Tap the envelope)</p>
      </div>
      
      <EnvelopeInvitation ref="envelopeCompRef" :isOpened="isOpened" @open="handleOpen">
        <InvitationCard ref="cardCompRef" />
      </EnvelopeInvitation>
      
      <button class="skip-btn" @click="handleSkip" v-if="!isOpened">Skip Intro</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.intro-section {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  
  &.is-opened {
    height: auto;
    min-height: 100vh;
    overflow: visible;
  }
}

.bg-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--color-sage-light) 0%, var(--color-beige) 100%);
  z-index: 1;
}

.intro-content {
  position: relative;
  z-index: 30;
  opacity: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.intro-text {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--color-brown-soft);
  
  h2 {
    font-size: 1.2rem;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
  }
  
  .names {
    font-size: 2.2rem;
    color: var(--color-gold);
  }
  
  .tap-hint {
    font-size: 0.9rem;
    opacity: 0.7;
    margin-top: 1rem;
    animation: pulse 2s infinite;
  }
}

.skip-btn {
  margin-top: 3rem;
  color: var(--color-brown-soft);
  border-bottom: 1px solid currentColor;
  padding-bottom: 2px;
  font-size: 0.9rem;
  opacity: 0.6;
  
  &:hover {
    opacity: 1;
  }
}

@keyframes pulse {
  0% { opacity: 0.4; }
  50% { opacity: 1; }
  100% { opacity: 0.4; }
}
</style>

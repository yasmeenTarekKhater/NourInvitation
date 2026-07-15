<script setup lang="ts">
import { onMounted, ref } from 'vue';
import gsap from 'gsap';

const containerRef = ref<HTMLElement | null>(null);

onMounted(() => {
  if (!containerRef.value) return;
  const petals = containerRef.value.querySelectorAll('.petal');
  
  petals.forEach((petal) => {
    gsap.to(petal, {
      y: '100vh',
      x: 'random(-50, 50)',
      rotation: 'random(0, 360)',
      duration: 'random(8, 15)',
      repeat: -1,
      ease: 'none',
      delay: 'random(0, 5)'
    });
  });
});
</script>

<template>
  <div ref="containerRef" class="petals-container">
    <div v-for="i in 15" :key="i" class="petal" :style="{
      left: `${Math.random() * 100}%`,
      top: '-50px',
      scale: Math.random() * 0.5 + 0.5
    }">
    </div>
  </div>
</template>

<style scoped lang="scss">
.petals-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  z-index: 10;
}

.petal {
  position: absolute;
  width: 15px;
  height: 15px;
  background-color: var(--color-champagne);
  border-radius: 15px 0 15px 0;
  opacity: 0.6;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
}
</style>

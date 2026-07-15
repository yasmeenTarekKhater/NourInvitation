<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  isOpened: boolean;
}>();

const emit = defineEmits<{
  (e: 'open'): void;
}>();

const envelopeTopRef = ref<HTMLElement | null>(null);
const envelopeRef = ref<HTMLElement | null>(null);

defineExpose({
  envelopeTopRef,
  envelopeRef
});
</script>

<template>
  <div class="envelope-wrapper" ref="envelopeRef" @click="emit('open')">
    <div class="envelope">
      <div class="envelope-front"></div>
      <div class="envelope-top" ref="envelopeTopRef"></div>
      
      <!-- Slot for the card so it can be nested inside the envelope visually -->
      <div class="card-slot">
        <slot></slot>
      </div>
      
      <div class="envelope-bottom"></div>
      <div class="envelope-left"></div>
      <div class="envelope-right"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.envelope-wrapper {
  position: relative;
  width: 380px;
  height: 220px;
  margin: 0 auto;
  cursor: pointer;
  z-index: 20;
  perspective: 1000px;
  
  @media (max-width: 400px) {
    width: 320px;
    height: 200px;
  }
}

.envelope {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
}

.envelope-front, .envelope-bottom, .envelope-left, .envelope-right, .envelope-top {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #d1bfae; // Warm envelope color
  border-radius: 4px;
}

.envelope-front {
  z-index: 1;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}

.envelope-top {
  z-index: 5;
  height: 120px;
  clip-path: polygon(0 0, 50% 100%, 100% 0);
  background-color: #c4b1a0;
  transform-origin: top;
  border-bottom: 1px solid rgba(0,0,0,0.05);
}

.envelope-bottom {
  z-index: 4;
  height: 100%;
  clip-path: polygon(0 100%, 50% 30%, 100% 100%);
  background-color: #d1bfae;
  border-top: 1px solid rgba(0,0,0,0.05);
}

.envelope-left {
  z-index: 3;
  width: 50%;
  clip-path: polygon(0 0, 100% 50%, 0 100%);
  background-color: #cbb9a7;
}

.envelope-right {
  z-index: 3;
  width: 50%;
  right: 0;
  clip-path: polygon(100% 0, 0 50%, 100% 100%);
  background-color: #cbb9a7;
}

.card-slot {
  position: absolute;
  top: 10px;
  left: 5%;
  width: 90%;
  height: 90%;
  z-index: 2; /* Between back and front flaps */
}
</style>

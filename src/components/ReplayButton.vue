<script setup lang="ts">
import { RotateCcw } from 'lucide-vue-next';

const emit = defineEmits<{
  (e: 'replay'): void;
}>();
</script>

<template>
  <div class="replay-section">
    <button class="btn-primary" @click="emit('replay')">
      <RotateCcw :size="18" />
      <span>Replay Invitation</span>
    </button>
  </div>
</template>

<style scoped lang="scss">
.replay-section {
  padding: 2rem;
  display: flex;
  justify-content: center;
  background-color: var(--color-ivory);
}
</style>

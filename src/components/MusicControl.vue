<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Volume2, VolumeX } from 'lucide-vue-next';
import musicSrc from '../assets/Video Project 6.mp3';

const isPlaying = ref(true);
const audioRef = ref<HTMLAudioElement | null>(null);

const startAudio = () => {
  if (!audioRef.value) return;
  audioRef.value.play().then(() => {
    isPlaying.value = true;
  }).catch(() => {});
};

const toggleMusic = () => {
  if (!audioRef.value) return;

  if (isPlaying.value) {
    audioRef.value.pause();
    isPlaying.value = false;
  } else {
    audioRef.value.play().then(() => {
      isPlaying.value = true;
    }).catch(e => console.error('Audio playback failed', e));
  }
};

onMounted(() => {
  if (!audioRef.value) return;
  audioRef.value.volume = 0.45;

  // Try immediate autoplay first (works if browser allows it)
  audioRef.value.play().then(() => {
    isPlaying.value = true;
  }).catch(() => {
    // Browser blocked autoplay — wait for first user gesture
    document.addEventListener('click', startAudio, { once: true });
    document.addEventListener('touchstart', startAudio, { once: true });
  });
});

onUnmounted(() => {
  document.removeEventListener('click', startAudio);
  document.removeEventListener('touchstart', startAudio);
});
</script>

<template>
  <div class="music-control">
    <audio ref="audioRef" :src="musicSrc" loop preload="auto"></audio>

    <button
      @click="toggleMusic"
      class="music-btn"
      :class="{ 'is-playing': isPlaying }"
      :aria-label="isPlaying ? 'Pause music' : 'Play music'"
    >
      <span class="pulse-ring" v-if="isPlaying"></span>
      <Volume2 v-if="isPlaying" :size="22" />
      <VolumeX v-else :size="22" />
    </button>
  </div>
</template>

<style scoped lang="scss">
.music-control {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 100;
}

.music-btn {
  position: relative;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(8px);
  color: var(--color-sage);
  width: 52px;
  height: 52px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  border: 1.5px solid rgba(142, 163, 130, 0.3);
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: scale(1.08);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.16);
  }

  &.is-playing {
    color: var(--color-gold);
    border-color: rgba(197, 168, 120, 0.5);
  }
}

/* Pulsing ring when music is playing */
.pulse-ring {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 1.5px solid rgba(197, 168, 120, 0.5);
  animation: pulseRing 2s ease-out infinite;
  pointer-events: none;
}

@keyframes pulseRing {
  0%   { transform: scale(1); opacity: 0.7; }
  70%  { transform: scale(1.4); opacity: 0; }
  100% { transform: scale(1.4); opacity: 0; }
}
</style>

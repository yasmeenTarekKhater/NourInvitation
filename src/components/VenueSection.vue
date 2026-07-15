<script setup lang="ts">
import { MapPin } from 'lucide-vue-next';
import { invitationConfig } from '../config/invitation';
</script>

<template>
  <section class="venue-section">

    <!-- Layered decorative background -->
    <div class="venue-bg" aria-hidden="true">
      <div class="bg-circle bg-circle--1"></div>
      <div class="bg-circle bg-circle--2"></div>
      <div class="bg-circle bg-circle--3"></div>

      <div class="petal petal--1">✿</div>
      <div class="petal petal--2">❀</div>
      <div class="petal petal--3">✾</div>
      <div class="petal petal--4">✿</div>
      <div class="petal petal--5">❀</div>
      <div class="petal petal--6">♡</div>

      <div class="gold-line gold-line--top"></div>
      <div class="gold-line gold-line--bottom"></div>
    </div>

    <!-- Header -->
    <div class="section-header">
      <div class="header-ornament">❧</div>
      <h2>Wedding Venue</h2>
      <p class="subtitle cursive">Join us at this beautiful location</p>
      <div class="header-divider">
        <span class="divider-line"></span>
        <span class="divider-diamond">◆</span>
        <span class="divider-line"></span>
      </div>
    </div>

    <!-- Venue info card -->
    <div class="venue-card">
      <div class="venue-card__corner venue-card__corner--tl"></div>
      <div class="venue-card__corner venue-card__corner--tr"></div>
      <div class="venue-card__corner venue-card__corner--bl"></div>
      <div class="venue-card__corner venue-card__corner--br"></div>

      <h3>{{ invitationConfig.venue.name }}</h3>
      <p class="organization">{{ invitationConfig.venue.organization }}</p>
      <p class="location">{{ invitationConfig.venue.city }}, {{ invitationConfig.venue.country }}</p>
      <div class="time-badge">
        <span>🕗</span>
        <span>{{ invitationConfig.wedding.formattedTime }}</span>
      </div>
    </div>

    <!-- Map -->
    <div class="map-wrapper">
      <div class="map-glow"></div>
      <div class="map-frame">
        <div class="map-preview">
          <iframe
            loading="lazy"
            width="100%"
            height="100%"
            frameborder="0"
            scrolling="no"
            marginheight="0"
            marginwidth="0"
            src="https://maps.google.com/maps?width=100%25&amp;height=100%25&amp;hl=en&amp;q=Regency%20Hall,%20Damietta%20Port%20Authority%20Club,%20New%20Damietta,%20Egypt+(Nour%20and%20Nourhan%20Wedding)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
          </iframe>
        </div>
      </div>
    </div>

    <!-- Directions button -->
    <a
      :href="invitationConfig.venue.mapsUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="btn-directions"
      v-if="invitationConfig.features.mapEnabled"
    >
      <MapPin :size="16" />
      <span>Get Directions</span>
    </a>

  </section>
</template>

<style scoped lang="scss">
/* ─── Section wrapper ─────────────────────────────────────────── */
.venue-section {
  position: relative;
  padding: 5rem 2rem 4rem;
  text-align: center;
  overflow: hidden;

  /* Multi-stop warm gradient */
  background:
    linear-gradient(
      175deg,
      #fdf6ee 0%,
      #f5e8d4 30%,
      #ede0cb 60%,
      #f8f0e4 100%
    );
}

/* ─── Background decorations ──────────────────────────────────── */
.venue-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

/* Soft radial glows */
.bg-circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.18;
  filter: blur(60px);

  &--1 {
    width: 380px; height: 380px;
    top: -100px; left: -100px;
    background: radial-gradient(circle, #c5a878, transparent 70%);
  }
  &--2 {
    width: 300px; height: 300px;
    bottom: -80px; right: -80px;
    background: radial-gradient(circle, #8ea382, transparent 70%);
  }
  &--3 {
    width: 200px; height: 200px;
    top: 40%; left: 50%;
    transform: translate(-50%, -50%);
    background: radial-gradient(circle, #e8d0b0, transparent 70%);
    opacity: 0.25;
  }
}

/* Floating floral petals */
.petal {
  position: absolute;
  color: var(--color-gold);
  font-size: 2rem;
  opacity: 0.1;
  animation: floatPetal linear infinite;

  &--1 { top: 8%;  left: 5%;  font-size: 2.4rem; animation-duration: 18s; animation-delay: 0s; }
  &--2 { top: 15%; right: 6%; font-size: 1.8rem; animation-duration: 22s; animation-delay: -5s; }
  &--3 { top: 60%; left: 3%; font-size: 2rem;   animation-duration: 20s; animation-delay: -8s; }
  &--4 { top: 70%; right: 4%; font-size: 2.2rem; animation-duration: 16s; animation-delay: -3s; }
  &--5 { top: 35%; left: 8%; font-size: 1.5rem; animation-duration: 25s; animation-delay: -12s; }
  &--6 { top: 45%; right: 7%; font-size: 1.6rem; animation-duration: 19s; animation-delay: -7s; color: #c97070; }
}

@keyframes floatPetal {
  0%   { transform: translateY(0) rotate(0deg); }
  50%  { transform: translateY(-18px) rotate(15deg); }
  100% { transform: translateY(0) rotate(0deg); }
}

/* Horizontal gold accent lines */
.gold-line {
  position: absolute;
  left: 10%;
  width: 80%;
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(197, 168, 120, 0.35), transparent);

  &--top    { top: 0; }
  &--bottom { bottom: 0; }
}

/* ─── Section header ──────────────────────────────────────────── */
.section-header {
  position: relative;
  z-index: 1;
}

.header-ornament {
  font-size: 2rem;
  color: var(--color-gold);
  opacity: 0.5;
  margin-bottom: 0.25rem;
  display: block;
}

h2 {
  font-size: 2.2rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--color-brown-soft);
  margin-bottom: 0.4rem;
}

.subtitle {
  font-size: 1.4rem;
  color: var(--color-gold);
  opacity: 0.85;
  margin-bottom: 1rem;
}

.header-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  color: var(--color-gold);
  opacity: 0.5;

  .divider-line {
    display: block;
    width: 60px;
    height: 1px;
    background: currentColor;
  }

  .divider-diamond {
    font-size: 0.5rem;
  }
}

/* ─── Venue info card ─────────────────────────────────────────── */
.venue-card {
  position: relative;
  z-index: 1;
  max-width: 360px;
  margin: 0 auto 2rem;
  padding: 2rem 2rem;
  border-radius: 20px;
  &__corner {
    position: absolute;
    width: 18px;
    height: 18px;
    border-color: var(--color-gold);
    border-style: solid;
    opacity: 0.6;

    &--tl { top: 8px;  left: 8px;  border-width: 1.5px 0 0 1.5px; border-radius: 3px 0 0 0; }
    &--tr { top: 8px;  right: 8px; border-width: 1.5px 1.5px 0 0; border-radius: 0 3px 0 0; }
    &--bl { bottom: 8px; left: 8px;  border-width: 0 0 1.5px 1.5px; border-radius: 0 0 0 3px; }
    &--br { bottom: 8px; right: 8px; border-width: 0 1.5px 1.5px 0; border-radius: 0 0 3px 0; }
  }

  .venue-icon {
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
  }

  h3 {
    font-size: 1.45rem;
    font-weight: 700;
    color: var(--color-brown-soft);
    margin-bottom: 0.4rem;
  }

  .organization {
    font-size: 0.95rem;
    color: var(--color-sage);
    margin-bottom: 0.2rem;
  }

  .location {
    font-size: 0.9rem;
    color: var(--color-brown-soft);
    opacity: 0.7;
    margin-bottom: 1rem;
  }

  .time-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    background: linear-gradient(135deg, rgba(197, 168, 120, 0.18), rgba(142, 163, 130, 0.12));
    border: 1px solid rgba(197, 168, 120, 0.4);
    border-radius: 50px;
    padding: 0.4rem 1.1rem;
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--color-sage);
  }
}

/* ─── Map ─────────────────────────────────────────────────────── */
.map-wrapper {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

/* Glowing halo behind map */
.map-glow {
  position: absolute;
  inset: -12px;
  border-radius: 28px;
  background: linear-gradient(135deg, rgba(197, 168, 120, 0.214), rgba(142, 163, 130, 0.153));
  filter: blur(16px);
  z-index: 0;
}

.map-frame {
  position: relative;
  z-index: 1;
  padding: 6px;
  border-radius: 22px;
  background: linear-gradient(
    135deg,
    rgba(197, 168, 120, 0.7) 0%,
    rgba(255, 255, 255, 0.4) 50%,
    rgba(142, 163, 130, 0.6) 100%
  );
  box-shadow:
    0 16px 48px rgba(0, 0, 0, 0.14),
    0 4px 12px rgba(197, 168, 120, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.7);
}

.map-preview {
  width: 340px;
  height: 280px;
  border-radius: 18px;
  overflow: hidden;

  @media (min-width: 480px) {
    width: 440px;
    height: 320px;
  }

  iframe {
    display: block;
    width: 100%;
    height: 100%;
  }
}

/* ─── Directions button ───────────────────────────────────────── */
.btn-directions {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 2rem;
  border-radius: 50px;
  background: linear-gradient(135deg, var(--color-gold), #a8895c);
  color: #fff;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-decoration: none;
  box-shadow: 0 6px 20px rgba(197, 168, 120, 0.4);
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 28px rgba(197, 168, 120, 0.5);
  }

  &:active {
    transform: translateY(0);
  }
}
</style>

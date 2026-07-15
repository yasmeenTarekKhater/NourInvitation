import { ref } from 'vue';
import gsap from 'gsap';

export function useInvitationAnimation() {
  const isAnimating = ref(false);
  const isOpened = ref(false);

  const playOpeningSequence = (
    envelopeTopRef: HTMLElement | null,
    envelopeRef: HTMLElement | null,
    cardRef: HTMLElement | null,
    bgRef: HTMLElement | null,
    onComplete?: () => void
  ) => {
    if (isAnimating.value || isOpened.value) return;
    
    isAnimating.value = true;
    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.value = false;
        isOpened.value = true;
        if (onComplete) onComplete();
      }
    });

    // Background transition
    if (bgRef) {
      tl.to(bgRef, {
        opacity: 0.9,
        filter: 'blur(5px)',
        duration: 1,
        ease: 'power2.inOut'
      }, 0);
    }

    // Flap opening
    if (envelopeTopRef) {
      tl.to(envelopeTopRef, {
        rotationX: 180,
        duration: 1,
        transformOrigin: 'top',
        ease: 'power3.inOut'
      }, 0.5);
    }

    // Hide envelope first
    if (envelopeRef) {
      const parts = envelopeRef.querySelectorAll('.envelope-front, .envelope-top, .envelope-bottom, .envelope-left, .envelope-right');
      
      tl.to(parts, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut'
      }, 1.5);
    }

    // Then card appears
    if (cardRef) {
      tl.fromTo(cardRef,
        { y: 50, scale: 0.9, opacity: 0 },
        {
          y: -150,
          scale: 1.05,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out'
        },
        2.0
      );
    }
  };

  return {
    isAnimating,
    isOpened,
    playOpeningSequence
  };
}

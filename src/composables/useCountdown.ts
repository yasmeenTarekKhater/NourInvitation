import { ref, onMounted, onUnmounted } from 'vue';
import { invitationConfig } from '../config/invitation';

export function useCountdown() {
  const days = ref(0);
  const hours = ref(0);
  const minutes = ref(0);
  const seconds = ref(0);
  const isExpired = ref(false);

  let timer: ReturnType<typeof setInterval>;

  const calculateTimeLeft = () => {
    // The dateTime is "2026-08-14T20:00:00+03:00"
    const targetDate = new Date(invitationConfig.wedding.dateTime).getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      isExpired.value = true;
      clearInterval(timer);
      return;
    }

    days.value = Math.floor(difference / (1000 * 60 * 60 * 24));
    hours.value = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes.value = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    seconds.value = Math.floor((difference % (1000 * 60)) / 1000);
  };

  onMounted(() => {
    calculateTimeLeft();
    timer = setInterval(calculateTimeLeft, 1000);
  });

  onUnmounted(() => {
    if (timer) clearInterval(timer);
  });

  return { days, hours, minutes, seconds, isExpired };
}

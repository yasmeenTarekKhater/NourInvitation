export interface RsvpResponse {
  name: string;
  attendees: number;
  status: 'Joyfully Accepts' | 'Regretfully Declines' | '';
  message: string;
}

const STORAGE_KEY = 'wedding_rsvp';

export const saveRsvp = (data: RsvpResponse) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const getRsvp = (): RsvpResponse | null => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
};

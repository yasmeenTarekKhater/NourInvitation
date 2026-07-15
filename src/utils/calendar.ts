export function generateIcs(event: any) {
  const { title, location, description } = event;
  
  // Format dates for ICS
  const dtstart = event.dateTime.replace(/[-:]/g, '').replace(/\+.*$/, 'Z');
  // Just a simple approximation for demo, a real one would parse the timezone properly
  
  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Nour and Nourhan Wedding//EN
BEGIN:VEVENT
UID:${new Date().getTime()}@wedding.local
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}
DTSTART:${dtstart}
SUMMARY:${title}
LOCATION:${location}
DESCRIPTION:${description}
END:VEVENT
END:VCALENDAR`;

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', 'wedding-invitation.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

import { createApp } from 'vue'
import './assets/styles/main.scss'
import App from './App.vue'

// Import fonts manually via script to avoid adding to index.html (or we can add to index.html)
const link = document.createElement('link');
link.href = 'https://fonts.googleapis.com/css2?family=Great+Vibes&family=Inter:wght@300;400;600&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap';
link.rel = 'stylesheet';
document.head.appendChild(link);

createApp(App).mount('#app')

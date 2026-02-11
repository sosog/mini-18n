import { createTranslator } from 'mini-i18n';
import { en } from './translations/en';
import { es } from './translations/es';

const t = createTranslator('en', { en, es });

// Switch language on button click
document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const locale = target.getAttribute('data-locale');

    if (locale) {
        t.setLocale(locale);
        t.autoTranslate();

        // Update active class
        document.querySelectorAll('[data-locale]').forEach(btn => btn.classList.remove('active'));
        target.classList.add('active');
    }
});

// Initial render
t.autoTranslate();

// Inline pluralization example
let clickCount = 0;
const clickBtn = document.getElementById('click-btn');
const clickCountEl = document.getElementById('click-count');

clickBtn?.addEventListener('click', () => {
    clickCount++;
    if (clickCountEl) {
        clickCountEl.textContent = t.plural(clickCount, {
            zero: 'No clicks yet',
            one: 'You clicked once',
            other: 'You clicked {{count}} times'
        });
    }
});


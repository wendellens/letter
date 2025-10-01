const envelope = document.querySelector('.envelope-wrapper');
const heart = document.querySelector('.heart');

// Open the envelope on heart press (click) and keep it open
heart.addEventListener('click', () => {
    envelope.classList.add('flap');
});
const envelope = document.querySelector('.envelope-wrapper');
const heart = document.querySelector('.heart');
const fireworksContainer = document.querySelector('.fireworks-container');

// Track envelope state
let isEnvelopeOpen = false;

// Function to create a single firework explosion
function createFirework(x, y) {
    const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink'];
    const numParticles = 8;
    
    for (let i = 1; i <= numParticles; i++) {
        const particle = document.createElement('div');
        particle.className = `firework ${colors[Math.floor(Math.random() * colors.length)]} animate${i}`;
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        
        fireworksContainer.appendChild(particle);
        
        // Remove particle after animation completes
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 1500);
    }
}

// Function to create multiple fireworks
function launchFireworks() {
    const fireworkPositions = [
        { x: window.innerWidth * 0.2, y: window.innerHeight * 0.3 },
        { x: window.innerWidth * 0.8, y: window.innerHeight * 0.2 },
        { x: window.innerWidth * 0.1, y: window.innerHeight * 0.6 },
        { x: window.innerWidth * 0.9, y: window.innerHeight * 0.5 },
        { x: window.innerWidth * 0.5, y: window.innerHeight * 0.1 },
        { x: window.innerWidth * 0.3, y: window.innerHeight * 0.7 },
        { x: window.innerWidth * 0.7, y: window.innerHeight * 0.4 }
    ];
    
    // Launch fireworks with staggered timing
    fireworkPositions.forEach((position, index) => {
        setTimeout(() => {
            createFirework(position.x, position.y);
        }, index * 200);
    });
    
    // Add some random additional fireworks
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const randomX = Math.random() * window.innerWidth;
            const randomY = Math.random() * window.innerHeight * 0.7;
            createFirework(randomX, randomY);
        }, 1400 + (i * 300));
    }
}

// Function to create a single floating heart
function createFloatingHeart() {
    const heart = document.createElement('div');
    const colors = ['pink', 'red', 'purple', 'magenta', 'rose', 'coral', 'lavender'];
    const animations = ['anim1', 'anim2', 'anim3', 'anim4', 'anim5'];
    
    // Get envelope position for heart spawn point
    const envelopeRect = envelope.getBoundingClientRect();
    const heartColor = colors[Math.floor(Math.random() * colors.length)];
    const heartAnim = animations[Math.floor(Math.random() * animations.length)];
    
    heart.className = `floating-heart ${heartColor} ${heartAnim}`;
    
    // Position hearts to come from the envelope area with some randomness
    const spawnX = envelopeRect.left + (envelopeRect.width * 0.3) + (Math.random() * envelopeRect.width * 0.4);
    const spawnY = envelopeRect.top + (envelopeRect.height * 0.6) + (Math.random() * envelopeRect.height * 0.3);
    
    heart.style.left = spawnX + 'px';
    heart.style.top = spawnY + 'px';
    
    document.body.appendChild(heart);
    
    // Remove heart after animation completes
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, 4000);
}

// Function to create heart shower
function launchHeartShower() {
    // Create initial burst of hearts
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            createFloatingHeart();
        }, i * 100);
    }
    
    // Create continuous heart stream
    const heartInterval = setInterval(() => {
        createFloatingHeart();
    }, 200);
    
    // Stop heart stream after 3 seconds
    setTimeout(() => {
        clearInterval(heartInterval);
    }, 3000);
    
    // Final burst of hearts
    setTimeout(() => {
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                createFloatingHeart();
            }, i * 80);
        }
    }, 3200);
}

// Toggle envelope on heart press (click) with enhanced animation
heart.addEventListener('click', () => {
    // Add click animation class
    heart.classList.add('clicked');
    
    if (!isEnvelopeOpen) {
        // Open the envelope with a slight delay for the heart animation
        setTimeout(() => {
            envelope.classList.add('flap');
            isEnvelopeOpen = true;
            // Launch fireworks when envelope opens!
            setTimeout(() => {
                launchFireworks();
            }, 500);
            // Launch heart shower from envelope!
            setTimeout(() => {
                launchHeartShower();
            }, 300);
        }, 200);
    } else {
        // Close the envelope
        setTimeout(() => {
            envelope.classList.remove('flap');
            isEnvelopeOpen = false;
        }, 200);
    }
    
    // Remove the clicked class after animation completes
    setTimeout(() => {
        heart.classList.remove('clicked');
    }, 600);
});
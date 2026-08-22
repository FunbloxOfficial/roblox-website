// Get all "Learn More" buttons
const learnMoreButtons = document.querySelectorAll('.game-card button');

// Add click event listeners to each button
learnMoreButtons.forEach((button) => {
    button.addEventListener('click', function() {
        const gameName = this.parentElement.querySelector('h3').textContent;
        alert(`You clicked on ${gameName}! Coming soon: Game details page.`);
    });
});

// Get the CTA button in the hero section
const ctaButton = document.querySelector('.hero-content .cta-button');
ctaButton.addEventListener('click', function() {
    // Scroll to the games section
    const gamesSection = document.querySelector('.featured-games');
    gamesSection.scrollIntoView({ behavior: 'smooth' });
});

// Get the "Join Now" button
const joinButton = document.querySelector('.community .cta-button');
joinButton.addEventListener('click', function() {
    alert('Community signup coming soon! Stay tuned.');
});

// Mobile menu toggle (if you add a mobile menu later)
console.log('Funblox website loaded successfully!');

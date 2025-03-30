document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    }
    
    loadFooter();
    initMusicControl();
});

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

function initMusicControl() {
    createMusicControl();
    
    const musicOn = localStorage.getItem('musicOn') === 'true';
    
    if (!window.bgMusic) {
        window.bgMusic = new Audio('../sounds/background-music.mp3');
        window.bgMusic.loop = true;
        window.bgMusic.volume = 0.3;
    }
    
    updateMusicState(musicOn);
}

function createMusicControl() {
    const musicControl = document.createElement('div');
    musicControl.className = 'music-control';
    musicControl.innerHTML = '<button id="toggle-music">🔇 Music Off</button>';
    document.body.appendChild(musicControl);
    
    document.getElementById('toggle-music').addEventListener('click', function() {
        const currentState = localStorage.getItem('musicOn') === 'true';
        updateMusicState(!currentState);
    });
}

function updateMusicState(musicOn) {
    localStorage.setItem('musicOn', musicOn);
    
    const musicButton = document.getElementById('toggle-music');
    
    if (musicOn) {
        window.bgMusic.play();
        musicButton.innerHTML = '🎵 Music On';
        musicButton.classList.add('music-on');
    } else {
        window.bgMusic.pause();
        musicButton.innerHTML = '🔇 Music Off';
        musicButton.classList.remove('music-on');
    }
}

function loadFooter() {
    fetch('footer.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            const footerPlaceholder = document.getElementById('footer-placeholder');
            if (footerPlaceholder) {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = data;
                
                const footerElement = tempDiv.querySelector('footer');
                if (footerElement) {
                    footerPlaceholder.innerHTML = footerElement.outerHTML;
                }
            }
        })
        .catch(error => {});
}
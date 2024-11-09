const shiro = document.getElementById("shiro");
const counterDisplay = document.getElementById("counter");
const heartCounterDisplay = document.getElementById("heart-counter");
const resetButton = document.getElementById("reset-button");
let clickCount = 0;
let heartCount = 0;
let hearts = [];

shiro.addEventListener("mouseover", () => {
    shiro.style.cursor = "url('patpat.png'), auto";
});

shiro.addEventListener("mousedown", () => {
    shiro.style.cursor = "url('patpat1.png'), auto";
});

shiro.addEventListener("mouseup", () => {
    shiro.style.cursor = "url('patpat.png'), auto";
    clickCount++;
    counterDisplay.textContent = `Toques: ${clickCount}`;

    if (clickCount % 5 === 0) {
        generateHearts();
    }
});

// Función para generar corazones
function generateHearts() {
    for (let i = 0; i < 5; i++) {
        const heart = document.createElement("img");
        heart.src = "heart.png";
        heart.classList.add("heart");

        // Aumenta el contador de corazones y actualiza la visualización
        heartCount++;
        heartCounterDisplay.textContent = `Corazones: ${heartCount}`;

        let heartX, heartY;
        do {
            heartX = Math.random() * window.innerWidth;
            heartY = Math.random() * window.innerHeight;
        } while (heartX >= shiro.offsetLeft && heartX <= shiro.offsetLeft + shiro.offsetWidth &&
                 heartY >= shiro.offsetTop && heartY <= shiro.offsetTop + shiro.offsetHeight);

        heart.style.left = heartX + "px";
        heart.style.top = heartY + "px";

        const velocity = {
            x: (Math.random() - 0.5) * 4,
            y: (Math.random() - 0.5) * 4
        };

        hearts.push({ element: heart, velocity });
        document.body.appendChild(heart);
    }
}

// Función de animación para los corazones
function animateHearts() {
    hearts.forEach(heart => {
        const rect = heart.element.getBoundingClientRect();
        let newX = rect.left + heart.velocity.x;
        let newY = rect.top + heart.velocity.y;

        if (newX <= 0 || newX + rect.width >= window.innerWidth) {
            heart.velocity.x *= -1;
        }
        if (newY <= 0 || newY + rect.height >= window.innerHeight) {
            heart.velocity.y *= -1;
        }

        heart.element.style.left = newX + "px";
        heart.element.style.top = newY + "px";
    });
    requestAnimationFrame(animateHearts);
}

// Función de reinicio del juego
function resetGame() {
    // Reinicia los contadores
    clickCount = 0;
    heartCount = 0;
    counterDisplay.textContent = `Toques: ${clickCount}`;
    heartCounterDisplay.textContent = `Corazones: ${heartCount}`;

    // Elimina todos los corazones del DOM y limpia la lista
    hearts.forEach(heart => heart.element.remove());
    hearts = [];
}

// Evento para el botón de reinicio
resetButton.addEventListener("click", resetGame);

// Inicia la animación de los corazones
animateHearts();

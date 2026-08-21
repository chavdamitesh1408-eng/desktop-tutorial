const gameLinks = [
  { key: 'github', label: 'GitHub', icon: 'fa-brands fa-github' },
  { key: 'itch', label: 'itch.io', icon: 'fa-brands fa-itch-io' },
  { key: 'youtube', label: 'YouTube', icon: 'fa-brands fa-youtube' },
  { key: 'playstore', label: 'Google Play', icon: 'fa-brands fa-google-play' },
  { key: 'edgeext', label: 'Edge Extensions', icon: 'fa-brands fa-edge' },
  { key: 'firefoxext', label: 'Firefox Extensions', icon: 'fa-brands fa-firefox-browser' },
  { key: 'godot', label: 'Godot Asset Store', icon: 'fa-solid fa-puzzle-piece' }
];

const carousel = document.querySelector('#gamesCarousel');
let activeGame = 0;

function createGameCard(game, index) {
  const card = document.createElement('article');
  card.className = 'game-card';
  card.dataset.index = index;

  const buttons = gameLinks
    .filter((link) => game[link.key])
    .map((link) => `
      <a class="game-link" href="${game[link.key]}" target="_blank" rel="noreferrer">
        <i class="${link.icon}"></i>${link.label}
      </a>
    `)
    .join('');

  card.innerHTML = `
    <img src="${game.image}" alt="${game.title} artwork" loading="lazy">
    <div class="game-content">
      <p class="engine">${game.engine}</p>
      <h3>${game.title}</h3>
      <p>${game.description}</p>
      <div class="game-links">${buttons}</div>
    </div>
  `;

  card.addEventListener('click', () => setActiveGame(index));
  return card;
}

function renderGames() {
  if (!carousel || !Array.isArray(games)) return;

  carousel.innerHTML = '';
  games.forEach((game, index) => carousel.appendChild(createGameCard(game, index)));
  setActiveGame(0);
}

function setActiveGame(index) {
  activeGame = (index + games.length) % games.length;

  document.querySelectorAll('.game-card').forEach((card, cardIndex) => {
    const offset = cardIndex - activeGame;
    card.classList.toggle('active', offset === 0);
    card.style.setProperty('--offset', offset);
    card.style.zIndex = String(20 - Math.abs(offset));
  });
}

document.querySelector('.carousel-control.prev')?.addEventListener('click', () => setActiveGame(activeGame - 1));
document.querySelector('.carousel-control.next')?.addEventListener('click', () => setActiveGame(activeGame + 1));
document.getElementById("copyright-year").textContent = new Date().getFullYear();

renderGames();

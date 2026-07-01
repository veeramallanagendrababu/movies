// Authentication
const VALID_USERNAME = 'root';
const VALID_PASSWORD = 'root';

function initializeAuth() {
  const loginSection = document.getElementById('loginSection');
  const mainContent = document.getElementById('mainContent');
  const loginForm = document.getElementById('loginForm');
  const logoutBtn = document.getElementById('logoutBtn');
  const loginError = document.getElementById('loginError');
  const loginButton = loginForm ? loginForm.querySelector('button[type="submit"]') : null;

  // Debug: Check if all elements are found
  if (!loginForm) {
    console.error('Login form not found');
    return;
  }

  // Check if user is already logged in
  const isLoggedIn = localStorage.getItem('streamAppLoggedIn') === 'true';
  
  if (isLoggedIn) {
    loginSection.classList.add('hidden');
    mainContent.classList.remove('hidden');
    renderDiscover();
    renderMovies();
    renderWebSeries();
    renderPythonClasses();
    initializeSearch();
    initializeTabs();
  } else {
    loginSection.classList.remove('hidden');
    mainContent.classList.add('hidden');
  }

  // Function to handle login
  const handleLogin = (e) => {
    if (e) e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    console.log('Login attempt:', { username, password });

    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      localStorage.setItem('streamAppLoggedIn', 'true');
      loginSection.classList.add('hidden');
      mainContent.classList.remove('hidden');
      loginForm.reset();
      loginError.classList.add('hidden');
      renderDiscover();
      renderMovies();
      renderWebSeries();
      renderPythonClasses();
      initializeSearch();
      initializeTabs();
    } else {
      loginError.textContent = 'Invalid username or password';
      loginError.classList.remove('hidden');
      console.log('Login failed');
    }
  };

  // Login form submission
  loginForm.addEventListener('submit', handleLogin);

  // Logout button
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('streamAppLoggedIn');
    loginSection.classList.remove('hidden');
    mainContent.classList.add('hidden');
    loginForm.reset();
    loginError.classList.add('hidden');
  });
}

// Initialize auth on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeAuth);
} else {
  initializeAuth();
}

// Search functionality
function initializeSearch() {
  const movieSearch = document.getElementById('movieSearch');
  const seriesSearch = document.getElementById('seriesSearch');
  const pythonSearch = document.getElementById('pythonSearch');

  if (movieSearch) {
    movieSearch.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      filterMovies(query);
    });
  }

  if (seriesSearch) {
    seriesSearch.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      filterSeries(query);
    });
  }

  if (pythonSearch) {
    pythonSearch.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      filterPythonClasses(query);
    });
  }
}

function filterMovies(query) {
  const cards = document.querySelectorAll('#movieGrid .card');
  cards.forEach((card) => {
    const title = card.querySelector('h3').textContent.toLowerCase();
    if (title.includes(query)) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}

function filterSeries(query) {
  const cards = document.querySelectorAll('#seriesGrid .series-card');
  cards.forEach((card) => {
    const title = card.querySelector('h3').textContent.toLowerCase();
    if (title.includes(query)) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}

function filterPythonClasses(query) {
  const cards = document.querySelectorAll('#pythonGrid .card');
  cards.forEach((card) => {
    const title = card.querySelector('h3').textContent.toLowerCase();
    if (title.includes(query)) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}

const movies = [
  {
    title: 'Dhurandhar 2',
    category: 'Action',
    poster:
      'https://drive.google.com/file/d/1s6UXnN14rNfrbIIXQ7eP0ySqdSIk97J8/view?usp=sharing',
    fileId: '11dfHSzMdVN0IUg_bW3jQmQeXH9Y69aVS',
  },
  {
    title: 'Kalki 2898 AD',
    category: 'Epic mythological sci-fi',
    poster:
      'https://drive.google.com/file/d/1hQok73bVuz81dJB7wpOopOmAK3ce4ykN/view?usp=sharing',
    fileId: '1RVECW32pVxMPjc8P9DHBh-mndjDpZZqd',
  },
  {
    title: 'RRR',
    category: 'Action Period Drama and Epic',
    poster:
      'https://drive.google.com/file/d/1XxzDk7jhR5ocxlXSr_AYuCXSPldbwQPF/view?usp=sharing',
    fileId: '1kW4X2Xni7sqA7BPyeF_NmzTbcVNBfRms',
  },
  {
    title: 'Pushpa 2',
    category: 'Action Thriller and Crime-Drama',
    poster:
      'https://drive.google.com/file/d/1qB9f1QOtWB7Yl2RnlwHCuqW9AM6B1xD9/view?usp=sharing',
    fileId: '1YAcrJTsOfipKYVDy6MOOpmnyNouZBKA6',
  },
  {
    title: 'Salar Part 1',
    category: 'Action Thriller and Crime-Drama',
    poster:
      'https://drive.google.com/file/d/1ZEyf1CXWuA6tKxqkoXFcg-AiInPRGx_R/view?usp=sharing',
    fileId: '16tDts4LkLZ76wFDUwCVmmui4lVZvidCV',
  },
  {
    title: 'Thumbbad',
    category: 'Folk Horror and Dark Fantasy',
    poster:
      'https://drive.google.com/file/d/1gUkhByye5sY84S3EKN8dw38olX-i1vLW/view?usp=sharing',
    fileId: '1XuvPQlO5Wc74J1Y1QPrck5IOsQulq3x3',
  },
  {
    title: 'Guntur Kaaram',
    category: 'Action',
    poster:
      'https://drive.google.com/file/d/1lmH62HfXkIm8uGBaGLRxnQycwr8isgUZ/view?usp=sharing',
    fileId: '1wSr3txu1DcdJQcvEnQGmYaBfYPvO6N54',
  },
];

const movieGrid = document.getElementById('movieGrid');

function extractDriveFileId(input) {
  if (!input || typeof input !== 'string') return null;
  const trimmed = input.trim();

  if (/^[a-zA-Z0-9_-]{10,}$/.test(trimmed)) return trimmed;

  const patterns = [
    /\/file\/d\/([a-zA-Z0-9_-]+)/,
    /[?&]id=([a-zA-Z0-9_-]+)/,
    /\/uc\?export=[^&]+&id=([a-zA-Z0-9_-]+)/,
  ];

  for (const pattern of patterns) {
    const match = trimmed.match(pattern);
    if (match && match[1]) return match[1];
  }

  return null;
}

function toDriveImageUrl(fileId) {
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1200`;
}

function resolvePosterUrl(poster) {
  if (!poster || typeof poster !== 'string') return '';
  const trimmed = poster.trim();
  if (!trimmed.includes('drive.google.com')) return trimmed;

  const fileId = extractDriveFileId(trimmed);
  if (!fileId) return trimmed;

  return toDriveImageUrl(fileId);
}

function playMovie(movie) {
  if (!movie.fileId || movie.fileId.startsWith('REPLACE_WITH_')) {
    alert(`Please set a valid Google Drive fileId for ${movie.title} in app.js`);
    return;
  }

  const parsedFileId = extractDriveFileId(movie.fileId);
  if (!parsedFileId) {
    alert(`Invalid Google Drive link or fileId for ${movie.title}`);
    return;
  }

  const query = new URLSearchParams({
    title: movie.title,
    fileId: parsedFileId,
    source: 'movies',
  });
  window.location.href = `./player.html?${query.toString()}`;
}

// Discover Page
function renderDiscover() {
  const featured = movies[0] || null;
  
  if (featured) {
    const posterUrl = resolvePosterUrl(featured.poster);
    document.getElementById('heroPoster').src = posterUrl;
    document.getElementById('heroTitle').textContent = featured.title;
    document.getElementById('heroDescription').textContent = featured.category || 'Premium Content';
    
    document.getElementById('heroBtnPlay').onclick = () => playMovie(featured);
    document.getElementById('heroBtnInfo').onclick = () => {
      const tabBtn = document.querySelector('[data-tab="movies"]');
      tabBtn.click();
    };

    document.getElementById('heroPoster').onerror = () => {
      document.getElementById('heroPoster').src = 'https://images.unsplash.com/photo-1489599849228-5ab10d802b27?auto=format&fit=crop&w=800&q=80';
    };
  }

  // Trending Grid (Movies 0-3)
  renderContentGrid('trendingGrid', movies.slice(0, 4), 'movie');

  // Popular Movies Grid (alternate movies)
  renderContentGrid('popularMoviesGrid', movies.length > 4 ? movies.slice(1, 5) : movies, 'movie');

  // Featured Series Grid (first 3 series)
  renderContentGrid('featuredSeriesGrid', webSeries.slice(0, 3), 'series');
}

function renderContentGrid(gridId, items, type) {
  const grid = document.getElementById(gridId);
  if (!grid) return;
  grid.innerHTML = '';

  items.forEach((item) => {
    const card = document.createElement('article');
    card.className = 'card';
    const posterUrl = type === 'series' ? resolvePosterUrl(item.poster) : resolvePosterUrl(item.poster);
    
    card.innerHTML = `
      <img class="poster" src="${posterUrl}" alt="${item.title}" referrerpolicy="no-referrer" />
      <div class="content">
        <h3>${item.title}</h3>
        <p>${item.category || 'Content'}</p>
        <button type="button">View</button>
      </div>
    `;

    const posterImage = card.querySelector('img');
    posterImage.addEventListener('error', () => {
      posterImage.src = 'https://images.unsplash.com/photo-1489599849228-5ab10d802b27?auto=format&fit=crop&w=800&q=80';
    });

    card.querySelector('button').addEventListener('click', () => {
      if (type === 'movie') {
        playMovie(item);
      } else if (type === 'series') {
        // Show series details
        const tabBtn = document.querySelector('[data-tab="series"]');
        tabBtn.click();
      }
    });

    grid.appendChild(card);
  });
}

function renderMovies() {
  movieGrid.innerHTML = '';

  const sorted = [...movies].sort((a, b) => a.title.localeCompare(b.title));

  sorted.forEach((movie) => {
    const card = document.createElement('article');
    card.className = 'card';
    const posterUrl = resolvePosterUrl(movie.poster);
    card.innerHTML = `
      <img class="poster" src="${posterUrl}" alt="${movie.title}" referrerpolicy="no-referrer" />
      <div class="content">
        <h3>${movie.title}</h3>
        <p>${movie.category}</p>
        <button type="button">Play</button>
      </div>
    `;

    const posterImage = card.querySelector('img');
    posterImage.addEventListener('error', () => {
      posterImage.src =
        'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80';
    });

    const playButton = card.querySelector('button');
    playButton.addEventListener('click', () => playMovie(movie));

    movieGrid.appendChild(card);
  });
}

// Web series data — add your entries here
const webSeries = [
  {
    title: 'Game of Thrones',
    description: 'An epic fantasy series about power, politics, and survival',
    poster: 'https://drive.google.com/file/d/12AlHeDSCmCYoapv4NKcN5MaHyNMnWKxl/view?usp=sharing',
    seasons: [
      {
        number: 1,
        episodes: [
          { number: 1, title: 'Episode 1', fileId: '1YJ24FK8WXz2wbr-_SNrWIBtzNVk7jfvJ' },
          { number: 2, title: 'Episode 2', fileId: '1OynpL--j1-6RTaqHU_635Ptc_YjaQWRU' },
          { number: 3, title: 'Episode 3', fileId: '1QE4mC_lWzVOkSgeKtktSomkSjUdR7gMN' },
          { number: 4, title: 'Episode 4', fileId: '1GSr0SMNpwNhnxoI_P-2GRGzjK25qkrVh' },
          { number: 5, title: 'Episode 5', fileId: '1D7cbv5x1bHk6xwVXYQcypMG3MKzIPrJ2' },
          { number: 6, title: 'Episode 6', fileId: '16W0ifazJjm1_U2bXBaEfqeSnlfGvvAjS' },
          { number: 7, title: 'Episode 7', fileId: '1XsZUriaLWcoV952FhOP8tAUn7JnYCgak' },
          { number: 8, title: 'Episode 8', fileId: '1JLX1e3il2_RJR8J-mSWHJyYlHVjHhTl2' },
          { number: 9, title: 'Episode 9', fileId: '1e2FDTGR50TjSHfHA-21FW37s6SisnFuw' },
          { number: 10, title: 'Episode 10', fileId: '1gnq4zXaJvLQ75AoCeKQ-CmQckHb95W-4' },
        ],
      },
      {
        number: 2,
        episodes: [
          { number: 1, title: 'Episode 1', fileId: '1jphq-3b7V0Bejd7chEbYZ0l0C_-KUOZI' },
          { number: 2, title: 'Episode 2', fileId: '12dim8Tmrk_RoXDFdiH9lFgALfAocEJGN' },
          { number: 3, title: 'Episode 3', fileId: '1hyCe63RpDxBvOQNQxf5MWteqw734h5Ov' },
          { number: 4, title: 'Episode 4', fileId: '1gFOBNvPRsvok8LotnA5MTmBhFX2IMn3u' },
          { number: 5, title: 'Episode 5', fileId: '1wDwK8EIB_4wMKQw6HtgdRZkapvSGwT9E' },
          { number: 6, title: 'Episode 6', fileId: '14UJRvbGTZSB9HXQMGfuDnCcyHlGRws2h' },
          { number: 7, title: 'Episode 7', fileId: '1XMUMnNRzRcCiisry1Setv7dvQN6N6bJI' },
          { number: 8, title: 'Episode 8', fileId: '1WR4-2-ah91GY17cwNwRstFqDE0CbaJ9n' },
          { number: 9, title: 'Episode 9', fileId: '1StW8xuzRG7KF59mNS4UZnVBtv9BawJyr' },
          { number: 10, title: 'Episode 10', fileId: '1JspqutR_DFtEjOPS2BEFcQYiIpgEacAT' },
        ],
      },
      {
        number: 3,
        episodes: [
          { number: 1, title: 'Episode 1', fileId: '1XQDOkD_SDJA-fZTqpi2mXdOCWbXd1rNB' },
          { number: 2, title: 'Episode 2', fileId: '12btXyQ7QmtZUW3lt3AIvMK-4UZDAs8bu' },
          { number: 3, title: 'Episode 3', fileId: '1Wh6miZhjHJcu-gHSp7jJ_mCkdJ6bA-aO' },
          { number: 4, title: 'Episode 4', fileId: '1Kls9tWLcZS0yiGLArewrZwjKPFVyPguk' },
          { number: 5, title: 'Episode 5', fileId: '1Fh138iwN1RP6RlogKNvgD6-Ygk6HSWse' },
          { number: 6, title: 'Episode 6', fileId: '1e0jwKqJQaJHCyMa6dBy8pnxpV8S1qIEA' },
          { number: 7, title: 'Episode 7', fileId: '10Zu31JnU7mFJsWOrOZVSBK9QyqXD4pqh' },
          { number: 8, title: 'Episode 8', fileId: '12cPcyJjDBGjqCnnZ8xzKN4BMeoLioN_0' },
          { number: 9, title: 'Episode 9', fileId: '17ZGINNKg9cx72yrpfX49-a4e7M-pdmrO' },
          { number: 10, title: 'Episode 10', fileId: '1qz9b8xVeeogSOEmzJGytkYrYP1z9BPWq' },
        ],
      },
      {
        number: 4,
        episodes: [
          { number: 1, title: 'Episode 1', fileId: '1Zon9RPOt39MvDHnvVm_xonT6Z_kmIY-E' },
          { number: 2, title: 'Episode 2', fileId: '1uCOu8iRVDoWWi40nXu1VKW7OKEvViD12' },
          { number: 3, title: 'Episode 3', fileId: '1aJcahyEuv1zM0mmnRGjzmveg5O8uXB-L' },
          { number: 4, title: 'Episode 4', fileId: '1lsd-Qd4sgU3BeYegSmwJDlau-H8fAobg' },
          { number: 5, title: 'Episode 5', fileId: '1--2D_sTqh6d7D37c6JuXFHty30ErKqpQ' },
          { number: 6, title: 'Episode 6', fileId: '1-fZqcZ3_EEvyInyiaPp5zQ_-imyeaL8n' },
          { number: 7, title: 'Episode 7', fileId: '15sJs1XlvauxPdRLsYs1oXdsvpf0C0Hs8' },
          { number: 8, title: 'Episode 8', fileId: '1Fh-iT0JEaJmBLsqEl9GkuDl5V4e8DuEB' },
          { number: 9, title: 'Episode 9', fileId: '1hn8zZKnFqFrp6sURNoGhO2NOzeshV932' },
          { number: 10, title: 'Episode 10', fileId: '1GSwjW3EfKua6MQD632aSdQfy-dPo5wIA' },
        ],
      },
      {
        number: 5,
        episodes: [
          { number: 1, title: 'Episode 1', fileId: '1JEhVUVOiRLRq51vmd7sCKPLziBluVl1i' },
          { number: 2, title: 'Episode 2', fileId: '1OyifhydVeZ9acyITcwdvaBINWYAOXJb4' },
          { number: 3, title: 'Episode 3', fileId: '1Hc3P8o3yh84Ypiqihud3i5QknFImENva' },
          { number: 4, title: 'Episode 4', fileId: '1ZVnbR--mDe10EnHDSnsnb_mkRYT8DapE' },
          { number: 5, title: 'Episode 5', fileId: '1Rnv5p3SEam6bWVwBtpBsLfveTvw8QN5o' },
          { number: 6, title: 'Episode 6', fileId: '1Rd4og31u0YFkwseNhV9ajK80yFa1nN5Y' },
          { number: 7, title: 'Episode 7', fileId: '1_pJaSRT2qRfLe8VFRSjyvU7XcAg8RAS0' },
          { number: 8, title: 'Episode 8', fileId: '1tAMu1NYxxF41aVB4GgRM-KI-_wZgls6a' },
          { number: 9, title: 'Episode 9', fileId: '1Xvuhq2blQ5Ug-RMtKkbtehAnd5DGmXY3' },
          { number: 10, title: 'Episode 10', fileId: '1ZEts-zHRWZyES16jT_BwN4RQ33_P3gZC' },
        ],
      },
      {
        number: 6,
        episodes: [
          { number: 1, title: 'Episode 1', fileId: '1xYep_c3Pd0CYZW7xCBFS4rMVlHqgcA1v' },
          { number: 2, title: 'Episode 2', fileId: '1bc0IGB_28I1rBTVJ-HXKk_9ILCG8iW4R' },
          { number: 3, title: 'Episode 3', fileId: '1kM3iST-M2vQiXiOdrK1dWnK1avDa4tOm' },
          { number: 4, title: 'Episode 4', fileId: '1mgxb-vjq8-L-vWoIe2uwiAthAzfjtakh' },
          { number: 5, title: 'Episode 5', fileId: '1VSlX7Oixf9XPLd0cmIuGSJ66TJ0doKQI' },
          { number: 6, title: 'Episode 6', fileId: '1p3Zt5IPDEqzLcwgKaMEmF8sBt9gL7tei' },
          { number: 7, title: 'Episode 7', fileId: '1cqOQHh1Jd8e0vMTkA6sA5c7jHPUyYqFN' },
          { number: 8, title: 'Episode 8', fileId: '17SeXO78YXAMM0122yKtWZRCF-Cj8Jure' },
          { number: 9, title: 'Episode 9', fileId: '1w-4LoWZxZMh7xc3NF0hgwtstP57KXebE' },
          { number: 10, title: 'Episode 10', fileId: '1BU-cru28MgoNCbcQoRrtEW8khIxM9M_j' },
        ],
      },
      {
        number: 7,
        episodes: [
          { number: 1, title: 'Episode 1', fileId: '1c30xvzP5qzP5BHGWMMuVOH-itEh1WhTm' },
          { number: 2, title: 'Episode 2', fileId: '1LUz0yqZ5Tkpf-nh7-RBinlKa7eCIo9dE' },
          { number: 3, title: 'Episode 3', fileId: '16eO2vorTHIdqLR1_paAZuhugH9OQGGEx' },
          { number: 4, title: 'Episode 4', fileId: '1hEokck-_HqZRvpR9KXDAJhh85K_s9MUX' },
          { number: 5, title: 'Episode 5', fileId: '1ouzKaz55NcHyko5QFTaVazBbxRHc3u-X' },
          { number: 6, title: 'Episode 6', fileId: '1nLyyoTznXy4DGX3Q_ANUO857jVGEKv1V' },
          { number: 7, title: 'Episode 7', fileId: '1FLb1niRGC5Us_8QrpHxSEHuqpgREx02j' },
        ],
      },
      {
        number: 8,
        episodes: [
          { number: 1, title: 'Episode 1', fileId: '1dV5TjUGj07AGU0w5FqCvTWkPqsaV-mbO' },
          { number: 2, title: 'Episode 2', fileId: '1MFrzbFA9Y37ha1LFx93B0q3Gk9d3heeg' },
          { number: 3, title: 'Episode 3', fileId: '1VbeDUyqRn81hxAuLPaDEieT-ae_RwOsr' },
          { number: 4, title: 'Episode 4', fileId: '1MqV9140RyiBs7ByXDJSlb7rdWf2R-rvN' },
          { number: 5, title: 'Episode 5', fileId: '1LDoywatw9-wNOG7WzTdBgxUzAMmc3Qca' },
          { number: 6, title: 'Episode 6', fileId: '1erqH12VV_zHQ87d1N-ZSDNgSJQr6QVAi' },
        ],
      },
    ],
  },
];

const seriesGrid = document.getElementById('seriesGrid');

function renderWebSeries() {
  seriesGrid.innerHTML = '';

  if (webSeries.length === 0) {
    seriesGrid.innerHTML = '<p style="color:var(--muted)">No web series added yet. Populate the <code>webSeries</code> array in app.js.</p>';
    return;
  }

  const sorted = [...webSeries].sort((a, b) => a.title.localeCompare(b.title));

  sorted.forEach((series, idx) => {
    const seriesCard = document.createElement('article');
    seriesCard.className = 'series-card';
    const posterUrl = resolvePosterUrl(series.poster);
    seriesCard.innerHTML = `
      <img class="series-poster" src="${posterUrl}" alt="${series.title}" referrerpolicy="no-referrer" />
      <div class="series-content">
        <h3>${series.title}</h3>
        <p class="series-description">${series.description || 'Web series'}</p>
      </div>
      <div class="series-seasons" id="seasons-${idx}">
        ${series.seasons
          .map(
            (season) => `
          <div class="season-item">
            <button class="season-btn" data-series="${idx}" data-season="${season.number}">
              <span class="season-title">Season ${season.number}</span>
              <span class="episode-count">${season.episodes.length} Episode${season.episodes.length !== 1 ? 's' : ''}</span>
              <span class="expand-icon">▼</span>
            </button>
            <div class="episodes hidden" data-season="${season.number}">
              ${season.episodes
                .map(
                  (ep) => `
                <button class="episode" data-series="${idx}" data-season="${season.number}" data-episode="${ep.number}">
                  <span class="ep-number">Ep ${ep.number}</span>
                  <span class="ep-title">${ep.title}</span>
                </button>
              `
                )
                .join('')}
            </div>
          </div>
        `
          )
          .join('')}
      </div>
    `;

    const poster = seriesCard.querySelector('.series-poster');
    poster.addEventListener('error', () => {
      poster.src = 'https://images.unsplash.com/photo-1537459363879-5e29fca7d55f?auto=format&fit=crop&w=800&q=80';
    });

    const seasonButtons = seriesCard.querySelectorAll('.season-btn');
    seasonButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const seasonNum = btn.dataset.season;
        const seasonItem = btn.closest('.season-item');
        const episodesDiv = seasonItem.querySelector('.episodes');
        const icon = btn.querySelector('.expand-icon');
        
        episodesDiv.classList.toggle('hidden');
        icon.textContent = episodesDiv.classList.contains('hidden') ? '▼' : '▲';
      });
    });

    const episodeButtons = seriesCard.querySelectorAll('.episode');
    episodeButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const seriesIdx = btn.dataset.series;
        const seasonNum = btn.dataset.season;
        const episodeNum = btn.dataset.episode;
        playEpisode(webSeries[seriesIdx], seasonNum, episodeNum);
      });
    });

    seriesGrid.appendChild(seriesCard);
  });
}

function playEpisode(series, seasonNum, episodeNum) {
  const season = series.seasons.find((s) => s.number == seasonNum);
  if (!season) {
    alert('Season not found');
    return;
  }

  const episode = season.episodes.find((e) => e.number == episodeNum);
  if (!episode) {
    alert('Episode not found');
    return;
  }

  if (!episode.fileId || episode.fileId.startsWith('REPLACE_WITH_')) {
    alert(`Please set a valid Google Drive fileId for ${series.title} S${seasonNum}E${episodeNum} in app.js`);
    return;
  }

  const parsedFileId = extractDriveFileId(episode.fileId);
  if (!parsedFileId) {
    alert(`Invalid Google Drive link or fileId for ${series.title} S${seasonNum}E${episodeNum}`);
    return;
  }

  const query = new URLSearchParams({
    title: `${series.title} - Season ${seasonNum} Episode ${episodeNum}: ${episode.title}`,
    fileId: parsedFileId,
    source: 'series',
  });
  window.location.href = `./player.html?${query.toString()}`;
}

// Python classes data — add your entries here
const pythonClasses = [
  {
    title: 'Python Basics - Introduction',
    category: 'Python',
    poster: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80',
    fileId: 'REPLACE_WITH_GOOGLE_DRIVE_FILE_ID',
  },
];

const pythonGrid = document.getElementById('pythonGrid');

function renderPythonClasses() {
  pythonGrid.innerHTML = '';

  if (pythonClasses.length === 0) {
    pythonGrid.innerHTML = '<p style="color:var(--muted)">No Python classes added yet. Populate the <code>pythonClasses</code> array in app.js.</p>';
    return;
  }

  const sorted = [...pythonClasses].sort((a, b) => a.title.localeCompare(b.title));

  sorted.forEach((item) => {
    const card = document.createElement('article');
    card.className = 'card';
    const posterUrl = resolvePosterUrl(item.poster);
    card.innerHTML = `
      <img class="poster" src="${posterUrl}" alt="${item.title}" referrerpolicy="no-referrer" />
      <div class="content">
        <h3>${item.title}</h3>
        <p>${item.category || 'Python'}</p>
        <button type="button">Play</button>
      </div>
    `;
    const posterImage = card.querySelector('img');
    posterImage.addEventListener('error', () => {
      posterImage.src = 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80';
    });
    card.querySelector('button').addEventListener('click', () => playMovie(item));
    pythonGrid.appendChild(card);
  });
}

// Tab switching
function initializeTabs() {
  document.querySelectorAll('.tab-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach((b) => b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach((p) => p.classList.add('hidden'));
      btn.classList.add('active');
      document.getElementById('tab-' + btn.dataset.tab).classList.remove('hidden');
    });
  });

  // Handle tab parameter in URL (for returning from player)
  const params = new URLSearchParams(window.location.search);
  const tabToOpen = params.get('tab');
  if (tabToOpen) {
    const tabBtn = document.querySelector(`button[data-tab="${tabToOpen}"]`);
    if (tabBtn) {
      tabBtn.click();
    }
    // Clean up the URL
    window.history.replaceState({}, document.title, window.location.pathname);
  }
}

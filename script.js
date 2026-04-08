let API_KEY = "7febc90ae377b841cee16a6991b13495";
let currentPage = 1;
let totalPages = 1;
let currentMovies = [];

async function data() {
  try {
    let movieName = document.getElementById("movie_input").value.trim();
    let language = document.getElementById("language").value;
    let url = "";

    if (movieName !== "" && language !== "") {
      url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_original_language=${language}&page=${currentPage}`;
    } else if (movieName !== "") {
      url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${movieName}&page=${currentPage}`;
    } else if (language !== "") {
      url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_original_language=${language}&page=${currentPage}`;
    } else {
      url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${currentPage}`;
    }

    let res = await fetch(url);
    let data1 = await res.json();

    let moviesDiv = document.getElementById("movies");
    moviesDiv.innerHTML = "";

    currentMovies = data1.results;
    totalPages = data1.total_pages;

    currentMovies.forEach(movie => {
      let div = document.createElement("div");
      div.className = "movie_card";

      div.innerHTML = `
        <h4>${movie.title}</h4>
        <img style="width:100%;height:80%" src="https://image.tmdb.org/t/p/w200${movie.poster_path}" />
        <button data-id=${movie.id} class="wishlist-btn">
          Add to watchlist
        </button>
      `;

      moviesDiv.appendChild(div);
    });

    document.getElementById("pageNumber").innerText = currentPage;

  } catch (err) {
    console.log(err);
  }
}

function handleWatchlist(movieId) {
  let movie = currentMovies.find(m => m.id == movieId);

  let div = document.createElement("div");
  div.className = "movie_card";

  div.innerHTML = `
    <h4>${movie.title}</h4>
    <img style="width:100%;height:80%" src="https://image.tmdb.org/t/p/w200${movie.poster_path}" />
    <button data-id=${movie.id} class="clear-btn">
      Clear from watchlist
    </button>
  `;

  document.getElementById("watchlistedmovies").appendChild(div);
}

document.getElementById("movies").addEventListener("click", (e) => {
  if (e.target.classList.contains("wishlist-btn")) {
    let movieId = e.target.getAttribute("data-id");
    handleWatchlist(movieId);
    e.target.disabled = true;
  }
});

document.getElementById("watchlistedmovies").addEventListener("click", (e) => {
  if (e.target.classList.contains("clear-btn")) {
    let movieId = e.target.getAttribute("data-id");

    e.target.parentElement.remove();

    let btn = document.querySelector(`.wishlist-btn[data-id='${movieId}']`);
    if (btn) btn.disabled = false;
  }
});

document.getElementById("movie_search_btn").addEventListener("click", () => {
  currentPage = 1;
  data();
});

document.getElementById("next").addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    data();
  }
});

document.getElementById("prev").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    data();
  }
});

let toggleBtn = document.getElementById("themeToggle");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");

  if (document.body.classList.contains("light")) {
    toggleBtn.innerText = "☀️ Light";
  } else {
    toggleBtn.innerText = "🌙 Dark";
  }
});

data();
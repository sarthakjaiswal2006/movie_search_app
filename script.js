let API_KEY="7febc90ae377b841cee16a6991b13495"
let currentPage = 1;   
let totalPages=1;
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

    let movies = data1.results; 
    totalPages=data1.total_pages;

    if (movieName !== "" && language !== "") {
      movies = movies.filter(movie =>
        movie.title.toLowerCase().includes(movieName.toLowerCase())
      );
    }
    function handleWachlist(movieId){
        let movie = movies.filter(x=>x.id==movieId)  
        let div = document.createElement("div");  
        div.style="padding:20px;width:250px;height;500px" 
        div.className="movie_card" 
        div.innerHTML = ` 
            <h4>${movie[0].title}</h4>
            <img style="width:100%;height:80%" alt="movie image here" src="https://image.tmdb.org/t/p/w200${movie[0].poster_path}" /> 
            <button data-id=${movie[0].id} class="clear-btn" style="width:100%;padding:10px"> clear from watchlist</button>
        `;  
        moviesDiv=document.getElementById("watchlistedmovies") 
        moviesDiv.appendChild(div)
    } 
    document.getElementById("movies").addEventListener("click", (e) => {
    if (e.target.classList.contains("wishlist-btn")) {  
        let movieId = e.target.getAttribute("data-id");
        handleWachlist(movieId) 
        e.target.disabled=true 
    }
    });
    movies.forEach(movie => {
      let div = document.createElement("div"); 
      div.style="padding:20px;width:250px;height;500px" 
      div.className="movie_card" 
      div.innerHTML = ` 
        <h4>${movie.title}</h4>
        <img style="width:100%;height:80%" alt="movie image here" src="https://image.tmdb.org/t/p/w200${movie.poster_path}" /> 
        <button data-id=${movie.id} class="wishlist-btn" style="width:100%;padding:10px"> Add to watchlist</button>
      `;
      moviesDiv.appendChild(div); 
    });
    document.getElementById("pageNumber").innerText = currentPage;
  } catch (err) {
    console.log(err);
  }
}   
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
data();

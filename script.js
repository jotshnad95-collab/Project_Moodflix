const API_KEY = "f48ba004f26f68f6f2213cbcc4ae74ce";
const BASE_URL = "https://api.themoviedb.org/3/discover/movie";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

function enterApp() {
    document.querySelector(".hero").style.display = "none";
    document.getElementById("mood-section").classList.remove("hidden");
}

function discoverMood() {
    const mood = document.getElementById("moodInput").value.toLowerCase();
    let genreId;

    // Mood Mapping
    if (mood.includes("happy") || mood.includes("fun")) {
        genreId = 35; // Comedy
    } else if (mood.includes("sad") || mood.includes("emotional")) {
        genreId = 18; // Drama
    } else if (mood.includes("excited") || mood.includes("thrill")) {
        genreId = 28; // Action
    } else if (mood.includes("romantic") || mood.includes("love")) {
        genreId = 10749; // Romance
    } else {
        genreId = 35; // Default Comedy
    }

    showMovies(genreId);
}

async function showMovies(genreId) {

    document.getElementById("mood-section").classList.add("hidden");
    document.getElementById("movie-section").classList.remove("hidden");

    const container = document.getElementById("movies-container");
    container.innerHTML = "<h2>Loading...</h2>";

    try {
        const response = await fetch(
            `${BASE_URL}?api_key=${API_KEY}&with_genres=${genreId}`
        );

        const data = await response.json();
        container.innerHTML = "";

        data.results.slice(0, 10).forEach(movie => {

            const poster = movie.poster_path
                ? IMAGE_URL + movie.poster_path
                : "";

            container.innerHTML += `
                <div class="movie-card">
                    <img src="${poster}">
                    <button class="watch-btn"
                        onclick="watchNow(${movie.id})">
                        Watch Now
                    </button>
                </div>
            `;
        });

    } catch (error) {
        container.innerHTML = "<h2>Error loading movies</h2>";
    }
}

function goBack() {
    document.getElementById("movie-section").classList.add("hidden");
    document.getElementById("mood-section").classList.remove("hidden");
}

function watchNow(movieId) {
    window.open(
        `https://www.themoviedb.org/movie/${movieId}`,
        "_blank"
    );
}

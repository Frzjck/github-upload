const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=';
const container = document.querySelector(".container");
const search = document.querySelector(".search");

const config = {
    headers: {
        Accept: 'application/json',
    }
}



function renderizePage(dataAr) {
    dataAr.results.forEach(card => {
        if (card.poster_path) {
            let scoreColor = 'style="color:orange;"';
            if (card.vote_average < 5) {
                scoreColor = 'style="color:red;"';
            } else if (card.vote_average > 8) {
                scoreColor = 'style="color:greenyellow;"';
            }
            container.innerHTML +=
                `<div class="card">
                    <img src="https://image.tmdb.org/t/p/w1280/${card.poster_path}" alt="" />
                    <div class="foot">
                        <div class="filmName">${card.original_title}</div>
                        <div class="score" ${scoreColor}><p>${card.vote_average}</p></div>
                    </div>
                    <div class="description"><h3>Overview</h3>${card.overview}</div>
                </div>`;
        }
    });
}

search.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        container.innerHTML = "";
        fetch(SEARCH_API.concat(search.value), config)
            .then((res) => res.json())
            .then((data) => {
                renderizePage(data);
            });
        search.value = "";
    }
});


fetch(API_URL, config)
    .then((res) => res.json())
    .then((data) => {
        renderizePage(data);
    });
const show_type = document.getElementsByClassName('show-block')[0].id
const show_id = document.getElementsByClassName('show-overview-button')[0].id
const key = "9681493c16e2c16cba85aee9de76d451"

function initShow(showData) {
    if (show_type === "movie") {
        displayMovieData(showData)

    } else if (show_type === "tv") {
        displayTVShowData(showData)       
    }
}

function displayMovieData(data) {
    console.log(`On va donc instancier un objet Movie`)
    let movie = new Movie(data)
    movie.renderContent()
}

function displayTVShowData(data) {
    console.log(`On va donc instancier un objet tvShow`)
    let tvShow = new TVShow(data)
    tvShow.renderContent()
}

window.addEventListener('load', () => {
    fetch(`https://api.themoviedb.org/3/${show_type}/${show_id}?api_key=${key}&language=fr-FR&append_to_response=credits,videos`)
    .then(response => response.json())
    .then(show => initShow(show))
    .catch(error => console.log(error));
})
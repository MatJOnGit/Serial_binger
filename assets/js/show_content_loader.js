const show_id = document.getElementsByClassName('show-overview-button')[0].id
const show_type = document.getElementsByClassName('show-block')[0].id
const key = "9681493c16e2c16cba85aee9de76d451"

function initShow(showData) {
    if (show_type === "movie") {
        displayMovieData(showData)

    } else if (show_type === "tv") {
        // by default, a tv show is NOT considered as an animation show
        let isAnimationShow = false

        // if there is a genre is set at "Animation", reverse the boolean value of isAnimationShow ...
        for (const genreIndex in showData.genres) {
            if (showData.genres[genreIndex].name === `Animation`) {
                isAnimationShow = !isAnimationShow
            }
        }
        
        if (isAnimationShow) {
            displayAnimationShowData(showData)       
        } else {
            displayTVShowData(showData)
        }
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

function displayAnimationShowData(data) {
    console.log(`On va donc instancier un objet AnimationShow`)
    let animationShow = new AnimationShow(data)
    animationShow.renderContent()
}

window.addEventListener('load', () => {
    fetch(`https://api.themoviedb.org/3/${show_type}/${show_id}?api_key=${key}&language=fr-FR&include_adult=false&append_to_response=credits,videos`)
    .then(response => response.json())
    .then(show => initShow(show))
    .catch(error => console.log(error));
})
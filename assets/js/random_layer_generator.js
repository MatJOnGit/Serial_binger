const showTypes = ['movie', 'tv']

// Generate a random type of show to display
let randomIndex = Math.floor(Math.random()*showTypes.length)
let randomShowType = showTypes[randomIndex]

// Generate a random show index to display among the 20 first results
let randomShowIndex = Math.floor(Math.random()*20)

function displayRandomBackground(show) {
    const showLayer = document.getElementsByClassName(`show_layer`)[0]
    showLayer.style.backgroundImage = `url('https://image.tmdb.org/t/p/w500${show.results[randomShowIndex].backdrop_path}')`
}

window.addEventListener('load', () => {
    fetch(`https://api.themoviedb.org/3/discover/${randomShowType}?api_key=9681493c16e2c16cba85aee9de76d451&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`)
    .then(response => response.json())
    .then(show => displayRandomBackground(show))
    .catch(error => console.log(error))
})
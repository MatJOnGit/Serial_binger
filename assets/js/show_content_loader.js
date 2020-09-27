function displayShowSpecifics(show) {
    displayShowLayer(show)
    displayShowName(show)
    displayShowTrailer(show)
}

// Display show's title
function displayShowName(show) {
    var titleElt = document.getElementsByTagName("h1")[0]
    if (show_type === 'movie') {
        titleElt.textContent = show.title
    }
    else {
        titleElt.textContent = show.name
    }
}

// Display show's youtube trailer
function displayShowTrailer(show) {
    var trailerBox = document.getElementById('trailer-player')
    var trailerFrame = document.createElement('iframe')
    trailerFrame.src = "https://www.youtube.com/embed/" + show.videos.results[0].key

    trailerBox.appendChild(trailerFrame)

    // Wanna see genres
    // console.log(show.genres[0].name)
}

// Display show's layer 
function displayShowLayer(show) {
    var backgroundElt = document.getElementsByClassName("show_layer")[0]
    var baseUrl = 'https://image.tmdb.org/t/p/w500'
    backgroundElt.style.backgroundImage = "url('" + baseUrl + show.backdrop_path + "')"

    // Set casting cards
    var castingList = document.getElementsByClassName("casting-list")[0]

    show.credits.cast.forEach((card) => {
        if (card.profile_path !== null) {
            var actorCard = document.createElement('li')
            var actorImg = document.createElement('img')
            var cardTextBlock = document.createElement('div')

            actorCard.setAttribute('class', 'actor-card')
            actorImg.src = "https://image.tmdb.org/t/p/w500" + card.profile_path
            actorImg.alt = card.name

            castingList.appendChild(actorCard)
            actorCard.appendChild(actorImg)
            actorCard.appendChild(cardTextBlock)
            cardTextBlock.innerHTML = '<p>' + card.character + '</p><p>' + card.name + '</p>'
        }
    })
}

// Set creator name
    // console.log(show.created_by[0].name)
    // var showCreatorBox = document.getElementsByClassName("show_creator")
    // var creatorText = document.createElement('p')
    // showCreatorBox.appendChild(creatorText)

// "Le seigneur des anneaux" movie
// show_id = 122
// show_type = 'movie'

// "Lucifer" tv show
show_id = 63174
show_type = 'tv'

window.addEventListener('load', () => {
    // fetch les data de la série Lucifer (id 63174)
    fetch("https://api.themoviedb.org/3/" + show_type + "/" + show_id + "?api_key=9681493c16e2c16cba85aee9de76d451&language=fr-FR&append_to_response=credits,videos")
    .then(response => response.json())
    .then(showData => displayShowSpecifics(showData))
    .catch(error => console.log(error));
})
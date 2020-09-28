function renderShowSpecifics(show) {
    renderShowLayer(show)
    renderShowCasting(show)
    renderShowName(show)
    renderShowTrailer(show)
    renderShowLength(show)
    renderShowGenre(show)
    renderShowType(show)
    renderShowDirector(show)
    renderShowSynopsis(show)
}

function renderShowName(show) {
    var titleElt = document.getElementsByTagName("h1")[0]
    var firstAiringDate = ""

    if (show_type === 'movie') {
        firstAiringDate = show.release_date.split('-')[0]
    } else {
        firstAiringDate = show.first_air_date.split('-')[0]
    }

    if (show_type === 'movie') {
        titleElt.textContent = show.title + ' (' + firstAiringDate + ')'
    }
    else {
        titleElt.textContent = show.name + ' (' + firstAiringDate + ')'
    }
}

function renderShowTrailer(show) {
    var trailerBox = document.getElementById('trailer-player')
    var trailerFrame = document.createElement('iframe')
    trailerFrame.src = "https://www.youtube.com/embed/" + show.videos.results[0].key

    trailerBox.appendChild(trailerFrame)
}

function renderShowLayer(show) {
    var backgroundBox = document.getElementsByClassName("show_layer")[0]
    var baseUrl = 'https://image.tmdb.org/t/p/w500'
    backgroundBox.style.backgroundImage = "url('" + baseUrl + show.backdrop_path + "')"
}

function renderShowCasting(show) {
    var castingList = document.getElementsByClassName("casting-list")[0]

    // set max number of actor cards
    var maxDisplayedCards = 10

    show.credits.cast.forEach((card, index) => {

        // render the 10 first actor card if they have an profile picture
        if ((card.profile_path !== null) && (index < maxDisplayedCards)) {
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

// render a show length depending on the show type
function renderShowLength(show) {
    var showLengthBox = document.getElementsByClassName('show_length')[0]
    var showLengthTitle = showLengthBox.getElementsByTagName('h3')[0]
    var showLengthValue = showLengthBox.getElementsByTagName('p')[0]

    if (show_type === 'movie') {
        showLengthTitle.textContent = 'Durée du film :'
        var showMinutes = show.runtime % 60
        var showHours = (show.runtime - showMinutes) / 60
        showLengthValue.textContent = showHours + 'h' + showMinutes
    } else {
        showLengthTitle.textContent = 'Nombre de saison :'
        showLengthValue.textContent = show.number_of_seasons 
    }
}

function renderShowGenre(show) {
    var showGenreBox = document.getElementsByClassName('show_genre')[0]
    var showGenreText = showGenreBox.getElementsByTagName('p')[0]
    
    var showGenreValues = ""
    
    show.genres.forEach((genre, index) => {
        if (index > 0) {
            showGenreValues += ', ' + genre.name
        } else {
            showGenreValues = genre.name
        }
    })
    showGenreText.textContent = showGenreValues
}

function renderShowType(show) {
    var broadcasterBlock = document.getElementsByClassName('broadcaster-block')[0]
    var broadcasterIntro = broadcasterBlock.getElementsByTagName('p')[0]
    var showRatingButton = document.getElementsByClassName('show-overview-button')[0]
    var showInfoBox = document.getElementsByClassName('show-info')[0]
    var showInfoTitle = showInfoBox.getElementsByTagName('h2')[0]

    if (show_type === 'movie') {
        broadcasterIntro.textContent += 'le film sur :'
        showRatingButton.textContent += 'ce film'
        showInfoTitle.textContent += 'du film :'
    } else {
        broadcasterIntro.textContent += 'la série sur :'
        showRatingButton.textContent += 'cette série'
        showInfoTitle.textContent += 'de la série :'
    }
}

function renderShowDirector(show) {
    var showDirectorBox = document.getElementsByClassName('show_director')[0]
    var showDirectorTitle = showDirectorBox.getElementsByTagName('h3')[0]
    var showDirectorText = document.createElement('p')
    var showDirectorName = ''
    var showDirectorCounter = 0

    if (show_type === 'movie') {
        showDirectorTitle.textContent = 'Réalisateur'

        // Search for all directors
        show.credits.crew.forEach((crew) => {
            if ((crew.department === 'Directing') && (crew.job === 'Director')) {
                if (showDirectorName === '') {
                    showDirectorName = crew.name
                } else {
                    showDirectorName += ', ' + crew.name
                }
                showDirectorCounter ++
            }
        })

        // Deal with multiple directors case
        if (showDirectorCounter >= 2) {
            showDirectorTitle.textContent += 's :'
        } else {
            showDirectorTitle.textContent += ' :'
        }
    } else {
        showDirectorTitle.textContent = 'Créateur :'
        showDirectorName = show.created_by[0].name
    }

    showDirectorText.textContent = showDirectorName
    showDirectorBox.appendChild(showDirectorText)
}

function renderShowSynopsis(show) {
    var showHeader = document.getElementsByClassName('show-header')[0]
    var synopsisText = document.createElement('p')
    var synopsisValue = show.overview

    synopsisValue = synopsisValue.replaceAll("\n\n", '</p><p>')
    
    showHeader.appendChild(synopsisText)
    synopsisText.innerHTML = "<p>" + synopsisValue + "</p>"
}

// "Matrix" movie
show_id = 603
show_type = 'movie'

// "Lucifer" tv show
// show_id = 63174
// show_type = 'tv'

window.addEventListener('load', () => {
    // fetch les data de la série Lucifer (id 63174)
    fetch("https://api.themoviedb.org/3/" + show_type + "/" + show_id + "?api_key=9681493c16e2c16cba85aee9de76d451&language=fr-FR&append_to_response=credits,videos")
    .then(response => response.json())
    .then(showData => renderShowSpecifics(showData))
    .catch(error => console.log(error));
})
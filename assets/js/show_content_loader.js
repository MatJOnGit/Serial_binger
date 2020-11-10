const show_type = document.getElementsByClassName('main-content')[0].id
const show_id = document.getElementsByClassName('overview-button')[0].id
const key = `9681493c16e2c16cba85aee9de76d451`
defaultResponseTongue = `fr-FR`
backupResponseTongue = `us-US`

function initShow(showData) {
    if (show_type === `movie`) {
        displayMovieData(showData)

    } else if (show_type === `tv`) {
        displayTVShowData(showData)       
    }
    testMissingSynopsis(showData)
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

function testMissingSynopsis(showData) {
    if (showData.overview.length === 0) {
        console.log(`Pas de synopsis ... Bon ... pas de problème, on l'affiche en VO`)
        fetch(`https://api.themoviedb.org/3/${show_type}/${show_id}?api_key=${key}&language=${backupResponseTongue}&append_to_response=credits,videos`)
        .then(backupResponse => backupResponse.json())
        .then(backupShow => renderEnglishSynopsis(backupShow))
        .catch(error => console.log(error))
    } else {
        console.log(`Le synopsis est disponible en français.`)
    }
}

function renderEnglishSynopsis(backupShow) {
    let synopsisElt = document.getElementsByClassName(`show-synopsis`)[0]
    let replacementSynopsis = ``
    if (backupShow.overview.length > 0) {
        replacementSynopsis = backupShow.overview.replaceAll(`\n\n`, `</p></p>`)
    } else {
        replacementSynopsis = `Le synopsis de cette émission est malheureusement indisponible actuellement`
    }
    synopsisElt.textContent = replacementSynopsis
}

window.addEventListener('load', () => {
    fetch(`https://api.themoviedb.org/3/${show_type}/${show_id}?api_key=${key}&language=${defaultResponseTongue}&append_to_response=credits,videos`)
    .then(response => response.json())
    .then(show => initShow(show))
    .catch(error => console.log(error))
})
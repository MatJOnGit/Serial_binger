const defaultListType = 'movie'
let requestedContentType = defaultListType

const defaultResultsPage = 1
let requestedResultsPage = defaultResultsPage

let menuButtonElt
let menuButtonContent

const key = `9681493c16e2c16cba85aee9de76d451`
const language = `fr-FR`

const titleElt = document.getElementsByTagName(`h1`)[0]
const titleName = titleElt.getElementsByTagName('span')[0].textContent
const menuItemsBlock = document.getElementsByClassName(`results-menu`)[0]
const menuItems = menuItemsBlock.getElementsByTagName(`li`)

function renderSearchResults() {
    console.log(`Chargement d'un nouveau contenu de type ${requestedContentType}`)
    fetch(`https://api.themoviedb.org/3/search/${requestedContentType}?api_key=${key}&language=${language}&query=${titleName}&page=${requestedResultsPage}&include_adult=false`)
    .then(response => response.json())
    .then(content => {
        switch(requestedContentType) {
            case 'movie':
                let filteredMovieList = new FilteredMovieList(content.results)
                filteredMovieList.renderContentList()
                break
            case 'tv':
                let filteredTVShowList = new FilteredTVShowList(content.results)
                filteredTVShowList.renderContentList()
                break
            case 'person':
                let filteredArtistList = new FilteredArtistList(content.results)
                filteredArtistList.renderContentList()
                break
            default:
                console.log(`${requestedContentType} content is unknown`)
        }
        
    })
    .catch(error => console.log(error))
}

// Refresh eventListeners on 'inactive' menu button
function refreshMenuEventListeners() {
    for (menuButtonElt of menuItems) {
        if (menuButtonElt.classList[1].includes(`inactive-`)) {
            menuButtonElt.removeEventListener('click', refreshContent)
            menuButtonElt.addEventListener('click', refreshContent)
        }
    }
}

// set all buttons to inactive and set only clicked button to active
function resetMenuClasses(menuButtonElt, menuItems) {
    for (menuButtonElt of menuItems) {
        menuButtonElt.classList.replace('active-item', 'inactive-item')
    }
}

// Refresh Page content
function refreshContent(clickedMenuButton) {
    resetMenuClasses(menuButtonElt, menuItems)
    clickedMenuButton.target.classList.replace('inactive-item', 'active-item')
    // set the content type based on the clicked button
    requestedContentType = clickedMenuButton.target.classList.value.split('-results')[0]
    getRequestedContentType()
}

function getRequestedContentType() {
    // Charge the request content value out of the clicked button
    renderSearchResults()
    // Add conditionnal eventListeners
    refreshMenuEventListeners() 
}

window.addEventListener('load', () => {
    getRequestedContentType()
})
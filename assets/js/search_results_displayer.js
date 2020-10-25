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
    console.log(`Chargement d'un nouveau contenu`)
    fetch(`https://api.themoviedb.org/3/search/${requestedContentType}?api_key=${key}&language=${language}&query=${titleName}&page=${requestedResultsPage}&include_adult=false`)
    .then(response => response.json())
    .then(contents => {
        let filteredContentsList = new FilteredContentsList(contents.results)
        filteredContentsList.renderShowsList()
    })
    .catch(error => console.log(error))
}

function addContentTypeButtonInteractions() {
    for (menuButtonElt of menuItems) {
        // test si menuButton possède un eventListener{
        //     si oui, supprimer cet eventListener
        // }
        if (menuButtonElt.classList[1].includes(`inactive-`)) {
            menuButtonElt.removeEventListener('click', refreshContent)
            menuButtonElt.addEventListener('click', refreshContent)
        }
    }
}

function refreshContent(e) {
    // set all button to inactive and set only clicked button to active
    for (menuButtonElt of menuItems) {
        menuButtonElt.classList.replace('active-item', 'inactive-item')
    }
    e.target.classList.replace('inactive-item', 'active-item')
    
    // set the content type based on the clicked button
    requestedContentType = e.target.classList.value.split('-results')[0]
    getRequestedContentType()
}

function getRequestedContentType() {
    // Charge the request content value out of the clicked button
    renderSearchResults()
    // Add conditionnal eventListeners
    addContentTypeButtonInteractions() 
}

window.addEventListener('load', () => {
    getRequestedContentType()
})
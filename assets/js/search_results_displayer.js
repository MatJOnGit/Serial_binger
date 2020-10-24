const defaultListType = 'movie'
let requestedContentType = defaultListType
const defaultResultsPage = 1
const key = `9681493c16e2c16cba85aee9de76d451`
const language = `fr-FR`

const titleElt = document.getElementsByTagName(`h1`)[0]
const titleName = titleElt.getElementsByTagName('span')[0].textContent
const menuItemsBlock = document.getElementsByClassName(`results-menu`)[0]
const menuItems = menuItemsBlock.getElementsByTagName(`li`)

function renderSearchResults() {
    console.log(`Chargement d'un nouveau contenu`)
    fetch(`https://api.themoviedb.org/3/search/${requestedContentType}?api_key=${key}&language=${language}&query=${titleName}&page=${defaultResultsPage}&include_adult=false`)
    .then(response => response.json())
    .then(contents => {
        let filteredContentsList = new FilteredContentsList(contents.results)
        filteredContentsList.renderShowsList()
    })
    .catch(error => console.log(error))
}

function getRequestedContentType(requestedContentButton) {
    let requestedContentButtonClassValue = requestedContentButton.classList.value.split('-results')[0]
    requestedContentType = requestedContentButtonClassValue
    renderSearchResults()
    addContentTypeButtonInteractions() 
}

function addContentTypeButtonInteractions() {
    for (const menuItem of menuItems) {
        if (!menuItem.classList.value.includes(requestedContentType)) {
            menuItem.addEventListener('click', () => {
                getRequestedContentType(menuItem)
            }, {once: true}
            )
        }
    }
}

window.addEventListener('load', () => {
    renderSearchResults()
    addContentTypeButtonInteractions()
})
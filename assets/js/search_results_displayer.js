const defaultListType = 'movie'
let requestedContentType = defaultListType

const defaultResultsPage = 1
let requestedContentPage = defaultResultsPage

let menuButtonElt
let menuButtonContent

const key = `9681493c16e2c16cba85aee9de76d451`
const language = `fr-FR`

const titleElt = document.getElementsByTagName(`h1`)[0]
const titleNameElt = titleElt.getElementsByTagName('span')[0].textContent
const titleName = titleNameElt.substring(1, titleNameElt.length-1)
const menuItemsBlock = document.getElementsByClassName(`results-menu`)[0]
const menuItems = menuItemsBlock.getElementsByTagName(`li`)
const pagingContainer = document.getElementsByClassName(`paging-container`)[0]

function renderSearchResults() {
    fetch(`https://api.themoviedb.org/3/search/${requestedContentType}?api_key=${key}&language=${language}&query=${titleName}&page=${requestedContentPage}&include_adult=false`)
    .then(response => response.json())
    .then(content => {
        console.log(`requête : https://api.themoviedb.org/3/search/${requestedContentType}?api_key=${key}&language=${language}&query=${titleName}&page=${requestedContentPage}&include_adult=false`)
        console.log(`Il y a ${content.total_results} résultats pour cette requête`)
        console.log(`Affichage de ${content.results.length} résultats`)
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
        }
        return content
    })
    .then(content => addPagingElements(content))
    .catch(error => console.log(error))
}

// Refresh eventListeners on 'inactive' menu button
function refreshMenuEventListeners() {
    for (menuButtonElt of menuItems) {
        if (menuButtonElt.classList[1].includes(`inactive-`)) {
            menuButtonElt.removeEventListener('click', refreshContentType)
            menuButtonElt.addEventListener('click', refreshContentType)
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
function refreshContentType(clickedMenuButton) {
    resetMenuClasses(menuButtonElt, menuItems)
    clickedMenuButton.target.classList.replace('inactive-item', 'active-item')
    // set the content type based on the clicked button
    requestedContentType = clickedMenuButton.target.classList.value.split('-results')[0]
    // set the content page on default
    requestedContentPage = defaultResultsPage
    refreshContentPage()
}

function refreshContentPage() {
    pagingContainer.innerHTML = ``
    getRequestedContent()
}

function addPageIndex(content) {
    const pagingIndex = document.createElement(`p`)
    pagingIndex.textContent = `Page ${requestedContentPage} / ${content.total_pages}`
    pagingContainer.appendChild(pagingIndex)
}

function addPreviousButton(content) {
    if (content.page > 1) {
        const prevButton = document.createElement(`button`)
        const prevIcon = document.createElement(`i`)
        prevButton.classList = `prev-button`
        prevIcon.classList = `fas fa-angle-left`
        pagingContainer.appendChild(prevButton)
        prevButton.appendChild(prevIcon)
        addPagingEventListener(prevButton)
    }
}

function addNextButton(content) {
    if (content.page < content.total_pages) {
        const nextButton = document.createElement(`button`)
        const nextIcon = document.createElement(`i`)
        nextButton.classList = `next-button`
        nextIcon.classList = `fas fa-angle-right`
        pagingContainer.appendChild(nextButton)
        nextButton.appendChild(nextIcon)
        addPagingEventListener(nextButton)
    }
}

function addPagingEventListener(button) {
    if (button.classList.contains(`prev-button`)) {
        button.addEventListener(`click`, () => {
            requestedContentPage--
            refreshContentPage()
        })
    }
    else if (button.classList.contains(`next-button`)) {
        button.addEventListener(`click`, () => {
            requestedContentPage++
            refreshContentPage()
        })
    }
}

function addPagingElements(content) {
    addPageIndex(content)
    addPreviousButton(content)
    addNextButton(content)
}

function getRequestedContent() {
    renderSearchResults()
    refreshMenuEventListeners()
}

window.addEventListener('load', () => {
    getRequestedContent()
})
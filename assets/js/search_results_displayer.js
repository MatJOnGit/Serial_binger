const defaultContentType = 'movie'
let requestedContentType = defaultContentType

const defaultContentPage = 1
let requestedContentPage = defaultContentPage

let menuButtonContent

const key = `9681493c16e2c16cba85aee9de76d451`
const language = `fr-FR`

const titleElt = document.getElementsByTagName(`h1`)[0]
const titleNameElt = titleElt.getElementsByTagName('span')[0].textContent
const titleName = titleNameElt.substring(1, titleNameElt.length-1)
const menuItemsBlock = document.getElementsByClassName(`search-menu`)[0]
const menuItems = menuItemsBlock.getElementsByTagName(`li`)
const pagingContainer = document.getElementsByClassName(`paging-container`)[0]

function renderResults() {
    fetch(`https://api.themoviedb.org/3/search/${requestedContentType}?api_key=${key}&language=${language}&query=${titleName}&page=${requestedContentPage}&include_adult=false`)
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
        }
        return content
    })
    .then(content => renderPaging(content))
    .catch(error => console.log(error))
}

function addTypeButtonsInteractions() {
    for (menuButtonElt of menuItems) {
        if (menuButtonElt.classList[1].includes(`inactive-`)) {
            menuButtonElt.addEventListener('click', editContentType)
        }
    }
}

function renderPaging(content) {
    pagingContainer.innerHTML = ``
    const pagingIndex = document.createElement(`p`)
    pagingIndex.textContent = `Page ${content.page} / ${content.total_pages}`
    pagingContainer.appendChild(pagingIndex)

    if (content.page > 1) {
        const prevButton = document.createElement(`button`)
        const prevIcon = document.createElement(`i`)
        prevButton.classList = `prev-button`
        prevIcon.classList = `fas fa-angle-left`
        pagingContainer.appendChild(prevButton)
        prevButton.appendChild(prevIcon)
        addPagingButtonsInteractions(prevButton)
    }

    if (content.page < content.total_pages) {
        const nextButton = document.createElement(`button`)
        const nextIcon = document.createElement(`i`)
        nextButton.classList = `next-button`
        nextIcon.classList = `fas fa-angle-right`
        pagingContainer.appendChild(nextButton)
        nextButton.appendChild(nextIcon)
        addPagingButtonsInteractions(nextButton)
    }
}

function addPagingButtonsInteractions(button) {
    if (button.classList.contains(`prev-button`)) {
        button.addEventListener(`click`, () => {
            requestedContentPage--
            renderResults()
        })
    }
    else if (button.classList.contains(`next-button`)) {
        button.addEventListener(`click`, () => {
            requestedContentPage++
            renderResults()
        })
    }
}

function initTypeEditing(clickedTypeButton) {
    // Set the content type based on the clicked button class
    requestedContentType = clickedTypeButton.classList.value.split('-search')[0]
    // set the content index to the default value
    requestedContentPage = defaultContentPage

    for (let menuButtonElt of menuItems) {
        if (menuButtonElt.classList[1].includes(`inactive-`)) {
            menuButtonElt.removeEventListener('click', editContentType)
        }
        else {
            menuButtonElt.classList.replace('active-search', 'inactive-search')
        }
    }
    clickedTypeButton.classList.replace('inactive-search', 'active-search')
}

function editContentType(clickEvent) {
    initTypeEditing(clickEvent.target)
    addTypeButtonsInteractions()
    renderResults()
}

window.addEventListener('load', () => {
    addTypeButtonsInteractions()
    renderResults()
})
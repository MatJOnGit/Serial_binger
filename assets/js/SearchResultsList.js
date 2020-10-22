class SearchResultsList {
    constructor (shows) {
        console.log(`L'objet SearchResultsList a bien été initialisé.`)
        this._showList = shows
        this._searchResultsList = document.getElementsByClassName(`search-results-list`)[0]
        this._synopsisMaxLength = 100
    }

    get showList() { return this._showList }
    get searchResultsList() { return this._searchResultsList }
    get synopsisMaxLength() { return this._synopsisMaxLength}

    // display every result in the list
    displayList() {
        console.log(this.showList)
        this.showList.forEach(showItem => {
            this.renderShowItem(showItem)
        })
    }

    // build results for display
    renderShowItem(showItem) {
        const resultCard = document.createElement('li')
        const resultLink = document.createElement('a')
        const showImgContainer = document.createElement('div')
        const showPoster = document.createElement('img')
        const showInfo = document.createElement('div')
        const showTitle = document.createElement('h5')
        const showOverview = document.createElement('p')
        
        resultCard.className = `result-card`
        resultLink.href = 'index.php?action=getShowDetails&type=movie&id=' + showItem.id
        showImgContainer.className =`poster-container`
        showPoster.src = `https://image.tmdb.org/t/p/w500` + showItem.poster_path
        showInfo.className= `show-info-container truncate`
        showTitle.textContent = `${showItem.title} (${showItem.release_date.split('-')[0]})`

        if (('overview' in showItem) && (showItem.overview.length > 0)) {
            if (showItem.overview.length <= this.synopsisMaxLength) {
                showOverview.textContent = showItem.overview
            }
            else {
                showOverview.textContent = showItem.overview.substring(0, this.synopsisMaxLength) + "...";
            }
        }
        else {
            showOverview.textContent = '~ Aucun synopsis pour ce film ~'
        }
        


        this.searchResultsList.appendChild(resultCard)
        resultCard.appendChild(resultLink)
        resultLink.appendChild(showImgContainer)
        showImgContainer.appendChild(showPoster)
        resultLink.appendChild(showInfo)
        showInfo.appendChild(showTitle)
        showInfo.appendChild(showOverview)
    }
}
class FilteredContentsList {
    constructor (shows) {
        this._showsItems = shows
        this._synopsisMaxLength = 110
        this._showDetailsBaseURL = `index.php?action=getShowDetails&type=movie&id=`
        this._posterBaseURL = `https://image.tmdb.org/t/p/w500`

        this._showsList = document.getElementsByClassName(`search-results-list`)[0]
    }

    get showsItems() { return this._showsItems }
    get synopsisMaxLength() { return this._synopsisMaxLength }
    get showDetailsBaseURL() { return this._showDetailsBaseURL }
    get posterBaseURL() { return this._posterBaseURL }
    get showsList() { return this._showsList }

    // Render all results in the list
    renderShowsList() {
        this.emptyList()
        this.showsItems.forEach(show => {
            this.renderShowItems(show)
        })
    }

    emptyList() {
        this.showsList.innerHTML = ""
    }

    // Call methods to render all show data
    renderShowItems(show) {
        const showCard = this.renderShowCard()
        const showLink = this.renderShowLink(show, showCard)
        const showPosterContainer = this.renderShowPosterContainer(showLink)
        this.renderShowPoster(show, showPosterContainer)
        const showInfoContainer = this.renderShowInfoContainer(showLink)
        this.renderShowTitle(show, showInfoContainer)
        this.renderShowSynopsis(show, showInfoContainer)
    }

    renderShowCard() {
        const showCard = document.createElement(`li`)
        showCard.className = `result-card`
        this.showsList.appendChild(showCard)
        return showCard
    }

    renderShowLink(showItem, showCard) {
        const showLink = document.createElement(`a`)
        showLink.href = `${this.showDetailsBaseURL}${showItem.id}`
        showCard.appendChild(showLink)
        return showLink
    }

    renderShowPosterContainer(showLink) {
        const showPosterContainer = document.createElement(`div`)
        showPosterContainer.className =`poster-container`
        showLink.appendChild(showPosterContainer)
        return showPosterContainer
    }

    renderShowPoster(showItem, showPosterContainer) {
        if (`poster_path` in showItem) {
            if (showItem.poster_path != null) {
                const showPoster = document.createElement(`img`)
                showPoster.src = `${this.posterBaseURL}${showItem.poster_path}`
                showPosterContainer.appendChild(showPoster)
            }
            else {
                const sadFaceIcon = document.createElement(`i`)
                showPosterContainer.style.backgroundColor = `lightslategrey`
                sadFaceIcon.className = `far fa-frown`
                showPosterContainer.appendChild(sadFaceIcon)
            }
        } else {
            showPosterContainer.style.backgroundColor = `lightslategrey`
        }
    }

    renderShowInfoContainer(showLink) {
        const showInfoContainer = document.createElement(`div`)
        showInfoContainer.className= `show-info-container`
        showLink.appendChild(showInfoContainer)
        return showInfoContainer
    }

    renderShowTitle(showItem, showInfoContainer) {
        const showTitle = document.createElement(`h5`)

        if (`release_date` in showItem) {
            if (showItem.release_date.length > 0) {
                showTitle.textContent = `${showItem.title} (${showItem.release_date.split('-')[0]})`
            }
            else {
                showTitle.textContent = `${showItem.title}`
            }
        }
        showInfoContainer.appendChild(showTitle)
    }

    renderShowSynopsis(showItem, showInfoContainer) {
        const showOverview = document.createElement(`p`)

        if (`overview` in showItem) {
            const synopsisLength = showItem.overview.length
            if ((synopsisLength - 1)*(synopsisLength - this.synopsisMaxLength) <= 0) {
                showOverview.textContent = showItem.overview
            }
            else if (showItem.overview.length > this.synopsisMaxLength) {
                showOverview.textContent = showItem.overview.substring(0, this.synopsisMaxLength) + `...`;
            }
            else {
                showOverview.textContent = `~ Aucun synopsis pour ce film ~`
            }
        }
        else {
            showOverview.textContent = `~ Aucun synopsis pour ce film ~`
        }

        showInfoContainer.appendChild(showOverview)
    }

}
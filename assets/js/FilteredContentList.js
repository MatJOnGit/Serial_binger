class FilteredContentList {
    constructor(contentItems) {
        this._contentItems = contentItems
        this._showInfoMaxLength = 110
        this._posterBaseURL = `https://image.tmdb.org/t/p/w500`

        this._contentList = document.getElementsByClassName(`search-results-list`)[0]
    }

    get contentItems() { return this._contentItems }
    get showInfoMaxLength() { return this._showInfoMaxLength }
    get posterBaseURL() { return this._posterBaseURL }
    get contentList() { return this._contentList }

    // Render all results in the list
    renderContentList() {
        this.emptyContentList()
        this.contentItems.forEach(contentItem => {
            this.renderContentItems(contentItem)
        })
    }

    emptyContentList() {
        this.contentList.innerHTML = ""
    }

    renderContentCard() {
        const contentCard = document.createElement(`li`)
        contentCard.className = `result-card`
        this.contentList.appendChild(contentCard)
        return contentCard
    }

    renderContentPosterContainer(contentLink) {
        const contentPosterContainer = document.createElement(`div`)
        contentPosterContainer.className =`poster-container`
        contentLink.appendChild(contentPosterContainer)
        return contentPosterContainer
    }

    renderContentInfoContainer(contentLink) {
        const contentInfoContainer = document.createElement(`div`)
        contentInfoContainer.className= `content-info-container`
        contentLink.appendChild(contentInfoContainer)
        return contentInfoContainer
    }
}
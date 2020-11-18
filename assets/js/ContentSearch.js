class ContentSearch {
    constructor() {
        this._defaultContentType = 'movie'
        this._defaultContentPage = 1
        this._tmdbKey = `9681493c16e2c16cba85aee9de76d451`
        this._defaultResponseTongue = `fr-FR`

        this._requestedContentType = this.defaultContentType
        this._requestedContentPage = this.defaultContentPage

        this._titleElt = document.getElementsByTagName(`h1`)[0]
        this._titleNameElt = this.titleElt.getElementsByTagName('span')[0].textContent
        this._titleName = this.titleNameElt.substring(1, this.titleNameElt.length-1)
        this._menuItemsBlock = document.getElementsByClassName(`search-menu`)[0]
        this._menuItems = this.menuItemsBlock.getElementsByTagName(`li`)
        this._pagingContainer = document.getElementsByClassName(`paging-container`)[0]

        this.editContentType = this.editContentType.bind(this)
    }

    get defaultContentType() { return this._defaultContentType }
    get defaultContentPage() { return this._defaultContentPage }
    get tmdbKey() { return this._tmdbKey }
    get defaultResponseTongue() { return this._defaultResponseTongue }
    get requestedContentType() { return this._requestedContentType }
    get requestedContentPage() { return this._requestedContentPage }

    get titleElt() { return this._titleElt }
    get titleNameElt() { return this._titleNameElt }
    get titleName() { return this._titleName }
    get menuItemsBlock() { return this._menuItemsBlock }
    get menuItems() { return this._menuItems }
    get pagingContainer() { return this._pagingContainer }

    set requestedContentType(data) { this._requestedContentType = data }
    set requestedContentPage(data) { this._requestedContentPage = data }

    initSearch() {
        this.addTypeButtonsInteractions()
        this.addTypeButtonsInteractions()
        this.renderResults()
    }

    addTypeButtonsInteractions() {
        for (let menuButtonElt of this.menuItems) {
            if (menuButtonElt.classList[1].includes(`inactive-`)) {
                menuButtonElt.addEventListener('click', this.editContentType)
            }
        }
    }

    editContentType(clickedEvent) {
        this.initTypeEditing(clickedEvent.target)
        this.addTypeButtonsInteractions()
        this.renderResults()
    }

    initTypeEditing(clickedTypeButton) {
        // Set the content type based on the clicked button class
        this.requestedContentType = clickedTypeButton.classList.value.split('-search')[0]
        // set the content index to the default value
        this.requestedContentPage = this.defaultContentPage

        for (let menuButtonElt of this.menuItems) {
            if (menuButtonElt.classList[1].includes(`inactive-`)) {
                menuButtonElt.removeEventListener('click', this.editContentType)
            }
            else {
                menuButtonElt.classList.replace('active-search', 'inactive-search')
            }
        }
        clickedTypeButton.classList.replace('inactive-search', 'active-search')
    }

    renderResults() {
        fetch(`https://api.themoviedb.org/3/search/${this.requestedContentType}?api_key=${this.tmdbKey}&language=${this.defaultResponseTongue}&query=${this.titleName}&page=${this.requestedContentPage}&include_adult=false`)
        .then(response => response.json())
        .then(content => {
            switch(this.requestedContentType) {
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
        .then(content => this.renderPaging(content))
        .catch(error => console.log(error))
    }

    renderPaging(content) {
        this.pagingContainer.innerHTML = ``
        const pagingIndex = document.createElement(`p`)
        pagingIndex.textContent = `Page ${content.page} / ${content.total_pages}`
        this.pagingContainer.appendChild(pagingIndex)
    
        if (content.page > 1) {
            const prevButton = document.createElement(`button`)
            const prevIcon = document.createElement(`i`)
            prevButton.classList = `prev-button`
            prevIcon.classList = `fas fa-angle-left`
            this.pagingContainer.appendChild(prevButton)
            prevButton.appendChild(prevIcon)
            this.addPagingButtonsInteractions(prevButton)
        }
    
        if (content.page < content.total_pages) {
            const nextButton = document.createElement(`button`)
            const nextIcon = document.createElement(`i`)
            nextButton.classList = `next-button`
            nextIcon.classList = `fas fa-angle-right`
            this.pagingContainer.appendChild(nextButton)
            nextButton.appendChild(nextIcon)
            this.addPagingButtonsInteractions(nextButton)
        }
    }

    addPagingButtonsInteractions(button) {
        if (button.classList.contains(`prev-button`)) {
            button.addEventListener(`click`, () => {
                this.requestedContentPage--
                this.renderResults()
            })
        }
        else if (button.classList.contains(`next-button`)) {
            button.addEventListener(`click`, () => {
                this.requestedContentPage++
                this.renderResults()
            })
        }
    }
}
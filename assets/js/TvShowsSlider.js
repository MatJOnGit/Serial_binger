class TvShowsSlider {
    constructor (tvShowsContributions) {
        console.log('Nouveau TV Shows Slider instancié !')
        /* Inherited elements */
        this._tvShowsContributions = tvShowsContributions
        
        /* Static values */
        this._maxDisplayedCards = 10

        /* Slider DOM elements */
        this._tvShowsList = document.getElementsByClassName(`tv-shows-list`)[0]

        console.log(`L'objet TvShowsSlider a bien été instancié.`)
    }

    get tvShowsContributions() {
        return this._tvShowsContributions
    }

    get maxDisplayedCards() {
        return this._maxDisplayedCards
    }

    get list() {
        return this._tvShowsList
    }

    renderCards() {
        this.tvShowsContributions.forEach((card, index) => {
            if ((card.poster_path !== null) && (index < this.maxDisplayedCards)) {
                this.renderMovieCardDetails(card)
            }
        })
    }

    renderMovieCardDetails(card) {
        console.log(card)
        const tvShowCard = document.createElement('li')
        const tvShowImgContainer = document.createElement('div')
        const tvShowImg = document.createElement('img')
        const tvShowLink = document.createElement('a')
        const tvShowLinkIcon = document.createElement('i')
        const cardTextBox = document.createElement('div')
        const tvShowName = document.createElement('p')
        const actorRole = document.createElement('p')

        tvShowCard.className = 'tv-show-card'
        tvShowImg.src = `https://image.tmdb.org/t/p/w500${card.poster_path}`
        tvShowImg.alt = card.original_title
        tvShowLink.href = `index.php?action=getShowDetails&type=movie&id=${card.id}`
        tvShowLink.className = 'movie-link'
        tvShowLinkIcon.className = `fas fa-link`
        tvShowName.textContent = card.name
        actorRole.textContent = card.character

        this._tvShowsList.appendChild(tvShowCard)
        tvShowCard.appendChild(tvShowImgContainer)
        tvShowImgContainer.appendChild(tvShowImg)
        tvShowImgContainer.appendChild(tvShowLink)
        tvShowLink.appendChild(tvShowLinkIcon)
        tvShowCard.appendChild(cardTextBox)
        cardTextBox.appendChild(tvShowName)
        cardTextBox.appendChild(actorRole)
    }
}
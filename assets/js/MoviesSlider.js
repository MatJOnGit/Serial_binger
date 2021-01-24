class MoviesSlider {
    constructor (moviesContributions) {
        console.log('Nouveau Movies Slider instancié !')
        /* Inherited elements */
        this._moviesContributions = moviesContributions
        
        /* Static values */
        this._maxDisplayedCards = 10

        /* Slider DOM elements */
        this._moviesList = document.getElementsByClassName(`movies-list`)[0]

        console.log(`L'objet MoviesSlider a bien été instancié.`)
    }

    get moviesContributions() {
        return this._moviesContributions
    }

    get maxDisplayedCards() {
        return this._maxDisplayedCards
    }

    get list() {
        return this._moviesList
    }

    renderCards() {
        this.moviesContributions.forEach((card, index) => {
            if ((card.poster_path !== null) && (index < this.maxDisplayedCards)) {
                this.renderMovieCardDetails(card)
            }
        })
    }

    renderMovieCardDetails(card) {
        const movieCard = document.createElement('li')
        const movieImgContainer = document.createElement('div')
        const movieImg = document.createElement('img')
        const movieLink = document.createElement('a')
        const movieLinkIcon = document.createElement('i')
        const cardTextBox = document.createElement('div')
        const movieName = document.createElement('p')
        const actorRole = document.createElement('p')

        movieCard.className = 'movie-card'
        movieImg.src = `https://image.tmdb.org/t/p/w500${card.poster_path}`
        movieImg.alt = card.original_title
        movieLink.href = `index.php?action=getShowDetails&type=movie&id=${card.id}`
        movieLink.className = 'movie-link'
        movieLinkIcon.className = `fas fa-link`
        movieName.textContent = card.title
        actorRole.textContent = card.character

        this._moviesList.appendChild(movieCard)
        movieCard.appendChild(movieImgContainer)
        movieImgContainer.appendChild(movieImg)
        movieImgContainer.appendChild(movieLink)
        movieLink.appendChild(movieLinkIcon)
        movieCard.appendChild(cardTextBox)
        cardTextBox.appendChild(movieName)
        cardTextBox.appendChild(actorRole)
    }
}
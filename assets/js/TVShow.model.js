class TVShow extends Show {
    constructor (TVShowData) {
        super(TVShowData)

        /* API data locations and response reworks */
        this._backdropPath = super.showData.backdrop_path
        this._title = super.showData.name
        this._releaseDate = super.showData.first_air_date.split('-')[0]
        this._synopsis = super.showData.overview.replaceAll(`\n\n`, `</p></p>`)
        this._seasonCount = super.showData.number_of_seasons

        console.log(`L'objet TVShow a bien été instancié.`)
    }

    get backdropPath() {
        return this._backdropPath
    }

    get title() {
        return this._title
    }

    get releaseDate() {
        return this._releaseDate
    }

    get synopsis() {
        return this._synopsis
    }

    get seasonCount() {
        return this._seasonCount
    }

    renderLayer() {
        super.layerContainer.style.backgroundImage = `url('${super.backgroundBaseURL}${this.backdropPath}')`
    }

    renderTitle() {
        super.titleElt.textContent = `${this.title} (${this.releaseDate})`
    }

    renderSynopsis() {
        super.synopsisElt.innerHTML = `<p>${this.synopsis}</p>`
    }

    renderLength() {
        super.lengthTitle.textContent = `Nombre de saison : `
        super.lengthText.textContent = `${this.seasonCount}`
    }

    renderGenres() {
        super.genreText.textContent = super.buildGenresValue()
    }

    renderDirectors() {
        if (super.showData.created_by.length > 0) {
            let creator = super.showData.created_by[0].name
            super.directorsTitle.textContent = `Créateur :`
            super.directorsText.textContent = creator
        }
        else {
            super.removeEmptyDirectorsContainer()
        }
    }

    editRatingButton() {
        super.ratingButton.textContent += `cette série`
    }

    renderCasting() {
        let characterSlider = new Slider(super.showData.credits.cast)
        characterSlider.renderCards()
    }

    renderTrailerButton() {
        super.trailerButton.className += ` available-trailer`
        super.trailerButton.style = `block`
        this.renderDisplayableTrailer()
    }

    renderDisplayableTrailer() {
        super.trailerFrame.src = `${super.trailerBaseURL}${super.showData.videos.results[0].key}`
        super.trailerContainer.appendChild(super.trailerFrame)

        super.trailerButton.addEventListener("click", function() {
            document.getElementsByClassName(`trailer-player`)[0].style.display = "block"
        })
    }

    renderContent() {
        this.renderLayer()
        this.renderTitle()
        this.renderSynopsis()
        this.renderLength()
        this.renderGenres()
        this.renderDirectors()
        this.editRatingButton()
        this.renderCasting()

        if (super.showData.videos.results.length > 0){
            this.renderTrailerButton()
        } else {
            super.trailerButton.className += ` unavailable-trailer`
        }
    }
}
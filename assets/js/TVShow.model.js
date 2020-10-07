// TVShow class exists to assign the appropriate data from the API response to the appropriate DOM element

class TVShow extends Show {
    constructor (TVShowData) {
        super(TVShowData)

        /* API data locations and response reworks */
        this._backdropPath = this.showData.backdrop_path
        this._title = this.showData.name
        this._releaseDate = this.showData.first_air_date.split('-')[0]
        this._synopsis = this.showData.overview.replaceAll(`\n\n`, `</p></p>`)
        this._seasonCount = this.showData.number_of_seasons
        this._creator = this.showData.created_by[0].name

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

    get creator() {
        return this._creator
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

    renderShowLength() {
        super.lengthTitle.textContent = `Nombre de saison : `
        super.lengthText.textContent = `${this.seasonCount}`
    }

    renderShowGenres() {
        super.genreText.textContent = super.buildGenresValue()
    }

    renderShowDirectors() {
        super.directorsTitle.textContent = `Créateur :`
        super.directorsText.textContent = `${this.creator}`
    }

    renderCasting() {
        let characterSlider = new Slider(super.showData.credits.cast)
        characterSlider.renderCards()
    }







    editRatingButton() {
        super.ratingButton.textContent += `cette série`
    }

    renderContent() {
        this.renderLayer()
        this.renderTitle()
        this.renderSynopsis()
        this.renderShowLength()
        this.renderShowGenres()
        this.renderShowDirectors()
        this.editRatingButton()
        this.renderCasting()
    }
}
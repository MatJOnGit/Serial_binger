class TVShow extends Show {
    constructor (TVShowData) {
        super(TVShowData)

        /* Static values */
        this._watchlistButtonCustomText = ` cette série`
        this._showLengthTitle = ` Nombre de saison :`

        /* API data locations and response reworks */
        this._title = super.showData.name
        this._releaseDate = super.showData.first_air_date.split('-')[0]
        this._seasonCount = super.showData.number_of_seasons

        console.log(`L'objet TVShow a bien été instancié.`)
    }

    get title() { return this._title }
    get releaseDate() { return this._releaseDate }
    get seasonCount() { return this._seasonCount }

    renderLength() {
        super.lengthTitle.textContent = `${this._showLengthTitle}`
        super.lengthText.textContent = `${this.seasonCount}`
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

    renderContent() {
        console.log(`J'affiche le contenu de l'objet TVShow dans ma page`)
        super.renderLayer()
        super.renderTitle(this.title, this.releaseDate)
        super.renderSynopsis()
        this.renderLength()
        super.renderGenres()
        this.renderDirectors()
        super.renderCasting()
        super.tryRenderingTrailer()
        super.editRatingButton(this._watchlistButtonCustomText)
    }
}
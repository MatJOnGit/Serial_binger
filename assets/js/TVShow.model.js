// TVShow class exists to assign the appropriate data from the API response to the appropriate DOM element

class TVShow extends Show {
    constructor (TVShowData) {
        super(TVShowData)

        /* API data locations and response reworks */
        this._backdropPath = super.showData.backdrop_path
        this._title = super.showData.name
        this._releaseDate = super.showData.first_air_date.split('-')[0]
        this._synopsis = super.showData.overview.replaceAll(`\n\n`, `</p></p>`)

        /* Tests */
        console.log(super.showData)
        console.log(`L'objet tvShow a bien été instancié.`)
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

    renderLayer() {
        super.layerContainer.style.backgroundImage = `url('${super.backgroundBaseURL}${this.backdropPath}')`
    }

    renderTitle() {
        super.titleElt.textContent = `${this.title} (${this.releaseDate})`
    }

    renderSynopsis() {
        super.synopsisElt.innerHTML = `<p>${this.synopsis}</p>`
    }

    renderContent() {
        console.log(`J'affiche le contenu de l'objet TVshow dans ma page`)
        this.renderLayer()
        this.renderTitle()
        this.renderSynopsis()
    }
}
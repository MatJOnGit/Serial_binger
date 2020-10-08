class Movie extends Show {
    constructor (movieData) {
        super(movieData)

        /* Static values */
        this._watchlistButtonCustomText = ` ce film`

        /* API data locations and response reworks */
        this._title = super.showData.title
        this._releaseDate = super.showData.release_date.split('-')[0]
        this._runtime = super.showData.runtime

        console.log(`L'objet Movie a bien été instancié.`)
    }

    get title() { return this._title }
    get releaseDate() { return this._releaseDate }
    get runtime() { return this._runtime }

    renderRuntime() {
        let movieMinutesValue = this.runtime % 60
        let movieHoursValue = (this.runtime - movieMinutesValue) / 60
        super.lengthText.textContent = `${movieHoursValue}h${movieMinutesValue}`
    }

    renderDirectors() {
        let directorsTitleValue = `Réalisateur`
        let directorsNameValue = ``
        let directorsCount = 0

        let directorsTitleElt = document.getElementsByClassName(`show-directors-title`)[0]
        let directorsNameElt = document.getElementsByClassName(`show-directors-name`)[0]

        if (super.showData.credits.crew.length > 0) {
            // Search for all directors
            super.showData.credits.crew.forEach((crew) => {
                if ((crew.department === 'Directing') && (crew.job === 'Director')) {
                    if (directorsNameValue === '') {
                        directorsNameValue = crew.name
                    } else {
                        directorsNameValue += `, ${crew.name}`
                    }
                    directorsCount ++
                }
            })

            /* Initialize directors container values */
            directorsTitleElt.textContent = directorsTitleValue
            directorsNameElt.textContent = directorsNameValue

            // Deal with multiple directors case
            if (directorsCount >= 2) {
                directorsTitleElt.textContent += `s :`
            } else {
                directorsTitleElt.textContent += ` :`
            }
        }
        else {
            super.removeEmptyDirectorsContainer()
        }
    }

    renderContent() {
        console.log(`J'affiche le contenu de l'objet Movie dans ma page`)
        super.renderLayer()
        super.renderTitle(this.title, this.releaseDate)
        super.renderSynopsis()
        this.renderRuntime()
        super.renderGenres()
        this.renderDirectors()
        super.renderCasting()
        super.tryRenderingTrailer()
        super.editRatingButton(this._watchlistButtonCustomText)
    }
}
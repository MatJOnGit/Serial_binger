class Movie extends Show {
    constructor (movieData) {
        super(movieData)

        /* API data locations and response reworks */
        this._backdropPath = super.showData.backdrop_path
        this._title = super.showData.title
        this._releaseDate = super.showData.release_date.split('-')[0]
        this._synopsis = super.showData.overview.replaceAll(`\n\n`, `</p></p>`)
        this._runtime = super.showData.runtime

        console.log(`L'objet Movie a bien été instancié.`)
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

    get runtime() {
        return this._runtime
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
        let movieMinutesValue = this.runtime % 60
        let movieHoursValue = (this.runtime - movieMinutesValue) / 60
        super.lengthText.textContent = `${movieHoursValue}h${movieMinutesValue}`
    }

    renderGenres() {
        super.genreText.textContent = super.buildGenresValue()
    }

    buildGenresValue() {
        let genresValue = ""
        this.showData.genres.forEach((genre, index) => {
            if (index > 0) {
                genresValue += `, ${genre.name}`
            } else {
                genresValue = `${genre.name}`
            }
        })
        return genresValue
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
                directorsTitleElt.textContent = ` :`
            }
        }
        else {
            super.removeEmptyDirectorsContainer()
        }
    }

    editRatingButton() {
        super.ratingButton.textContent += `ce film`
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
        console.log(`J'affiche le contenu de l'objet Movie dans ma page`)
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
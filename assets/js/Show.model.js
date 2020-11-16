class Show {
    constructor(data) {
        /* Inherited elements */
        this._showData = data

        /* Static values */
        this._backgroundBaseURL = `https://image.tmdb.org/t/p/w500`
        this._trailerBaseURL = `https://www.youtube.com/embed/`

        /* DOM elements */
        this._synopsisElt = document.getElementsByClassName(`show-synopsis`)[0]
        this._titleElt = document.getElementsByTagName(`h1`)[0]

        this._lengthTitle = document.getElementsByClassName(`show-length-title`)[0]
        this._lengthText = document.getElementsByClassName(`show-length-value`)[0]

        this._genreText = document.getElementsByClassName(`show-genre-value`)[0]

        this._ratingButton = document.getElementsByClassName(`overview-button`)[0]

        this._directorsTitle = document.getElementsByClassName(`show-directors-title`)[0]
        this._directorsText = document.getElementsByClassName(`show-directors-name`)[0]

        this._trailerButton = document.getElementsByClassName(`trailer-button`)[0]

        this._trailerContainer = document.getElementsByClassName(`trailer-player`)[0]
        this._trailerFrame = document.createElement(`iframe`)

        /* API commun data and response reworks */
        this._backdropPath = this.showData.backdrop_path
        this._synopsis = this.showData.overview.replaceAll(`\n\n`, `</p></p>`)

        console.log(`L'objet Show a bien été instancié.`)
    }

    get showData() { return this._showData }

    get backdropPath() { return this._backdropPath }
    get backgroundBaseURL() { return this._backgroundBaseURL }

    get titleElt() { return this._titleElt }
    get synopsisElt() { return this._synopsisElt }

    get synopsis() { return this._synopsis }

    get showType() { return this._showType }

    get lengthTitle() { return this._lengthTitle }
    get lengthText() { return this._lengthText }

    get genreText() { return this._genreText }

    get directorsTitle() { return this._directorsTitle }
    get directorsText() { return this._directorsText }

    get ratingButton() { return this._ratingButton }
    
    get trailerButton() { return this._trailerButton }
    get trailerContainer() { return this._trailerContainer }
    get trailerFrame() { return this._trailerFrame }
    get trailerBaseURL() { return this._trailerBaseURL }

    renderTitle(title, releaseDate) {
        this.titleElt.textContent = `${title} (${releaseDate})`
    }

    renderSynopsis() {
        this.synopsisElt.innerHTML = `<p>${this.synopsis}</p>`
    }

    renderGenres() {
        this.genreText.textContent = this.buildGenresValue()
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

    removeEmptyDirectorsContainer() {
        console.log(`Ce show n'as pas de directeur référencé`)
        console.log(`Suppression du container Directeur en cours ...`)
        let showInfo = document.getElementsByClassName(`show-info`)[0]
        let showDirectorsContainer = document.getElementsByClassName(`show-directors-container`)[0]
        showInfo.removeChild(showDirectorsContainer)
    }

    renderCasting() {
        let characterSlider = new Slider(this.showData.credits.cast)
        characterSlider.renderCards()
    }

    editRatingButton(customText) {
        this.ratingButton.textContent += customText
    }

    tryRenderingTrailer() {
        if (this.showData.videos.results.length > 0){
            this.renderTrailerButton()
        } else {
            this.trailerButton.className += ` unavailable-trailer`
        }
    }

    renderTrailerButton() {
        this.trailerButton.className += ` available-trailer`
        this.trailerButton.style = `block`
        this.renderDisplayableTrailer()
    }

    renderDisplayableTrailer() {
        this.trailerFrame.src = `${this.trailerBaseURL}${this.showData.videos.results[0].key}`
        this.trailerContainer.appendChild(this.trailerFrame)

        this.trailerButton.addEventListener("click", function() {
            document.getElementsByClassName(`trailer-player`)[0].style.display = "block"
        })
    }
}
// Show class exists to store the DOM elements we need to edit and commun data

class Show {
    constructor(data) {

        /* Inherited elements */
        this._showData = data
        this._showType = show_type

        /* Static values */
        this._backgroundBaseURL = `https://image.tmdb.org/t/p/w500`
        this._trailerBaseURL = `https://www.youtube.com/embed/`

        /* Layer DOM elements */
        this._layerContainer = document.getElementsByClassName(`show_layer`)[0]

        /* Synopsis DOM elements */
        this._synopsisElt = document.getElementsByClassName(`show-synopsis`)[0]

        /* Title DOM elements */
        this._titleElt = document.getElementsByTagName(`h1`)[0]

        /* Show length elements */
        this._lengthTitle = document.getElementsByClassName(`show-length-title`)[0]
        this._lengthText = document.getElementsByClassName(`show-length-value`)[0]

        /* Show genres elements */
        this._genreText = document.getElementsByClassName(`show-genre-value`)[0]

        /* Rating button element */
        this._ratingButton = document.getElementsByClassName(`show-overview-button`)[0]

        /* Directors container */
        this._directorsTitle = document.getElementsByClassName(`show-directors-title`)[0]
        this._directorsText = document.getElementsByClassName(`show-directors-name`)[0]

        /* Trailer button */
        this._trailerButton = document.getElementsByClassName(`play-trailer-button`)[0]

        /* Trailer */
        this._trailerContainer = document.getElementsByClassName(`trailer-player`)[0]
        this._trailerFrame = document.createElement(`iframe`)

        console.log(`L'objet Show a bien été instancié.`)
    }

    get showData() {
        return this._showData
    }

    get layerContainer() {
        return this._layerContainer
    }

    get backgroundBaseURL() {
        return this._backgroundBaseURL
    }

    get titleElt() {
        return this._titleElt
    }

    get synopsisElt() {
        return this._synopsisElt
    }

    get showType() {
        return this._showType
    }

    get lengthTitle() {
        return this._lengthTitle
    }

    get lengthText() {
        return this._lengthText
    }

    get genreText() {
        return this._genreText
    }

    get directorsTitle() {
        return this._directorsTitle
    }

    get directorsText() {
        return this._directorsText
    }

    get ratingButton() {
        return this._ratingButton
    }

    get trailerButton() {
        return this._trailerButton
    }

    get trailerContainer() {
        return this._trailerContainer
    }

    get trailerFrame() {
        return this._trailerFrame
    }

    get trailerBaseURL() {
        return this._trailerBaseURL
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
}
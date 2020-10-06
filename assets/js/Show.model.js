// Show class exists to store the DOM elements we need to edit and commun data

class Show {
    constructor(data) {
        this._showData = data
        this._showType = show_type
        this._layerContainer = document.getElementsByClassName(`show_layer`)[0]
        this._backgroundBaseURL = `https://image.tmdb.org/t/p/w500`

        this._header = document.getElementsByClassName(`show-header`)[0]
        this._titleElt = document.getElementsByTagName(`h1`)[0]
        this._synopsisElt = document.createElement('p')
        this._header.appendChild(this.synopsisElt)
        // this._
    }

    get showData() {
        return this._showData
    }

    get header() {
        return this._header
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

    get showType() {
        return this._showType
    }

    get synopsisElt() {
        return this._synopsisElt
    }
}
class Layer {
    constructor() {
        this._layerContainer = document.getElementsByClassName(`show_layer`)[0]
        this._backgroundBaseURL = `https://image.tmdb.org/t/p/w500`
        this._key = `9681493c16e2c16cba85aee9de76d451`
        this._defaultResponseTongue = `fr-FR`
    }

    get layerContainer() { return this._layerContainer }
    get backgroundBaseURL() { return this._backgroundBaseURL }
    get backdropPath() { return this._backdropPath}

    renderBackground(backgroundAddress) {
        this.layerContainer.style.backgroundImage = backgroundAddress
    }
}
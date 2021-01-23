class Layer {
    constructor() {
        this._layerContainer = document.getElementsByClassName(`show_layer`)[0]
        this._backgroundBaseURL = `https://image.tmdb.org/t/p/w500`
        this._defaultResponseTongue = `fr-FR`

        this._displayedStaticLayer
    }

    get layerContainer() { return this._layerContainer }
    get backgroundBaseURL() { return this._backgroundBaseURL }
    get displayedStaticLayer() { return this._displayedStaticLayer }

    set displayedStaticLayer(data) { this._displayedStaticLayer = data }

    initStaticBackgroundRendering(contentData, contentType) {
        this.setStaticBackground(contentData, contentType)
        this.renderBackground(this.displayedStaticLayer)
    }

    // Set the url value of the layer background
    setStaticBackground(contentData, contentType) {
        if ((contentType === 'tv') || (contentType === 'movie')) {
            if (contentData.backdrop_path !== null) {
                this.displayedStaticLayer = `url('${this.backgroundBaseURL}${contentData.backdrop_path}')`
            }
        }
        else if (contentType === 'person') {
            if (contentData.profile_path !== null) {
                this.displayedStaticLayer = `url('${this.backgroundBaseURL}${contentData.profile_path}')`
            }
        }
    }

    renderBackground(backgroundPicture) {
        this.layerContainer.style.backgroundImage = backgroundPicture
    }
}
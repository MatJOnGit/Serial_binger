class Layer {
    constructor() {
        this._layerContainer = document.getElementsByClassName(`show_layer`)[0]
        this._backgroundBaseURL = `https://image.tmdb.org/t/p/w500`
        this._displayedStaticLayer
    }

    get layerContainer() { return this._layerContainer }
    get backgroundBaseURL() { return this._backgroundBaseURL }
    get displayedStaticLayer() { return this._displayedStaticLayer }

    set displayedStaticLayer(data) { this._displayedStaticLayer = data }

    initStaticBackgroundRendering(contentData) {
        this.setStaticBackground(contentData)
        this.renderBackground(this.displayedStaticLayer)
    }

    // Set the url value of the layer background
    setStaticBackground(contentData) {
        if (contentData.backdrop_path !== null) {
            this.displayedStaticLayer = `url('${this.backgroundBaseURL}${contentData.backdrop_path}')`
        }
        else {
            // Include a case when there is no backdrop_path in the API response
        }
    }

    renderBackground(backgroundPicture) {
        this.layerContainer.style.backgroundImage = backgroundPicture
    }
}
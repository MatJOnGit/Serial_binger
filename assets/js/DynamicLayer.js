class DynamicLayer extends Layer {
    constructor() {
        super()
        this._showTypes = ['movie', 'tv']
        this._tmdbKey = `9681493c16e2c16cba85aee9de76d451`

        this._randomTypeValue = Math.floor(Math.random()*this.showTypes.length)
        this._randomShowType = this.showTypes[this.randomTypeValue]
        this._randomShowIndex = Math.floor(Math.random()*20)

        this._displayedDynamicLayer
    }

    get showTypes() { return this._showTypes }
    get tmdbKey() { return this._tmdbKey }
    get randomTypeValue() { return this._randomTypeValue }
    get randomShowType() { return this._randomShowType }
    get randomShowIndex() { return this._randomShowIndex }
    get displayedDynamicLayer() { return this._displayedDynamicLayer }

    set randomShowIndex(data) { this._randomShowIndex = data }
    set displayedDynamicLayer(data) { this._displayedDynamicLayer = data }

    requestPopularShows() {
        fetch(`https://api.themoviedb.org/3/discover/${this.randomShowType}?api_key=${this.tmdbKey}&language=${super.defaultResponseTongue}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`)
        .then(response => response.json())
        .then(content => {
            this.initDynamicBackgroundRendering(content)
            return content
        })
        .catch(error => console.log(error))
    }

    initDynamicBackgroundRendering(shows) {
        this.setRandomBackground(shows)
        super.renderBackground(this.displayedDynamicLayer)
        this.setRandomLayerCyclingRendering(shows)
    }

    // Set the url value of the layer background
    setRandomBackground(shows) {
        if (shows.results[this.randomShowIndex].backdrop_path !== null) {
            this.displayedDynamicLayer = `url('${super.backgroundBaseURL}${shows.results[this.randomShowIndex].backdrop_path}')`
        }
        else {
            this.displayedDynamicLayer = `url('${super.backgroundBaseURL}${shows.results[0].backdrop_path}')`
        }
    }

    // Set the cycling actions to operate in order to get a dynamic layer rendering
    setRandomLayerCyclingRendering(shows) {
        setInterval(() => {
            this.randomShowIndex = Math.floor(Math.random()*20)
            this.setRandomBackground(shows)
            super.renderBackground(this.displayedDynamicLayer)
        }, 10000)
    }
}
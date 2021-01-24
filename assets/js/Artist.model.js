class Artist {
    constructor(artistData) {
        console.log(`L'objet Artist a bien été instancié.`)
        this._artistData = artistData

        this._artistPictureBaseURL = `https://image.tmdb.org/t/p/w500`
        this._artistBirthday = this._artistData.birthday.split('-')

        this._artistName = document.getElementsByClassName('artist-name')[0]
        this._artistDesc = document.getElementsByClassName(`artist-desc`)[0]
        this._artistBirthDay = document.getElementsByClassName(`birthday`)[0]
        this._artistBirthPlace = document.getElementsByClassName(`birthplace`)[0]
        this._artistPicture = document.getElementsByClassName(`artist-picture`)[0]
        this._artistBiography = document.getElementsByClassName(`artist-bio`)[0]
    }

    get artistPictureBaseURL() { return this._artistPictureBaseURL }
    get artistData() { return this._artistData }
    get artistName() { return this._artistName }
    get artistDesc() { return this._artistDesc }
    get artistBirthday() { return this._artistBirthday }
    get artistBirthPlace() { return this._artistBirthPlace }
    get artistBiography() { return this._artistBiography }
    
    set artistBiography(data) { this._artistBiography = data }

    renderContent() {
        this.renderName()
        this.renderBirthData()
        this.renderDeathData()
        this.renderArtistPicture()
        this.renderBiography()
        this.renderMoviesContributions()
        this.renderTVShowsContributions()
    }

    renderName() {
        this.artistName.textContent = this.artistData.name
    }

    renderBirthData() {
        this._artistBirthDay.textContent = `${this.artistBirthday[2]}/${this.artistBirthday[1]}/${this.artistBirthday[0]}`
        this._artistBirthPlace.textContent = this._artistData.place_of_birth
    }

    renderDeathData() {
        if (this._artistData.deathday !== null) {
            let deathTitle = document.createElement(`h5`)
            deathTitle.classList.add('artist-death')
            deathTitle.textContent = 'Mort :'

            let deathInfo = document.createElement(`p`)
            deathInfo.textContent = `${this.artistData.deathday.split('-')[2]}/${this.artistData.deathday.split('-')[1]}/${this.artistData.deathday.split('-')[0]}`

            this.artistDesc.appendChild(deathTitle)
            this.artistDesc.appendChild(deathInfo)
        }
    }

    renderArtistPicture() {
        this._artistPicture.style.backgroundImage = `url(${this._artistPictureBaseURL}${this.artistData.profile_path})`
    }

    renderBiography() {
        if (this.artistData.biography.length > 0 ) {
            this.artistBiography.textContent = this.artistData.biography
        }
        else {
            console.log(`Nous n'avons encore que trop peu d'information au sujet de cet artiste...`)
        }
    }

    renderMoviesContributions() {
        let moviesSlider = new MoviesSlider(this._artistData.movie_credits.cast)
        moviesSlider.renderCards()
    }

    renderTVShowsContributions() {
        let TVShowsSlider = new TvShowsSlider(this._artistData.tv_credits.cast)
        TVShowsSlider.renderCards()
    }
}
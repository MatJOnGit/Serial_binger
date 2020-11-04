class FilteredMovieList extends FilteredContentList {
    constructor(movieItems) {
        super(movieItems)
        this._movieDetailsBaseURL = `index.php?action=getShowDetails&type=movie&id=`
    }

    get movieDetailsBaseURL() { return this._movieDetailsBaseURL }

    // Call methods to render all show data
    renderContentItems(contentItem) {
        const movieCard = this.renderContentCard()
        const movieLink = this.renderContentLink(contentItem, movieCard)
        const moviePosterContainer = this.renderContentPosterContainer(movieLink)
        this.renderContentPoster(contentItem, moviePosterContainer)
        const movieInfoContainer = this.renderContentInfoContainer(movieLink)
        const movieHeaderLength = this.renderMovieHeader(contentItem, movieInfoContainer)
        this.renderContentSynopsis(contentItem, movieInfoContainer, movieHeaderLength)
    }
    
    renderContentLink(contentItem, contentCard) {
        const contentLink = document.createElement(`a`)
        contentLink.href = `${this.movieDetailsBaseURL}${contentItem.id}`
        contentCard.appendChild(contentLink)
        return contentLink
    }

    renderContentPoster(contentItem, moviePosterContainer) {
        if (`poster_path` in contentItem) {
            if (contentItem.poster_path != null) {
                const moviePoster = document.createElement(`img`)
                moviePoster.src = `${this.posterBaseURL}${contentItem.poster_path}`
                moviePosterContainer.appendChild(moviePoster)
            }
            else {
                const sadFaceIcon = document.createElement(`i`)
                moviePosterContainer.style.backgroundColor = `lightslategrey`
                sadFaceIcon.className = `far fa-frown`
                moviePosterContainer.appendChild(sadFaceIcon)
            }
        } else {
            moviePosterContainer.style.backgroundColor = `lightslategrey`
        }
    }

    renderMovieHeader(contentItem, movieInfoContainer) {
        const movieHeader = document.createElement('div')
        const movieTitle = document.createElement(`h5`)
        const movieReleaseDate = document.createElement('span')
        
        movieHeader.classList = `show-header`
        movieTitle.textContent = `${contentItem.title}`
        movieInfoContainer.appendChild(movieHeader)
        movieHeader.appendChild(movieTitle)

        if (`release_date` in contentItem) {
            if (contentItem.release_date.length > 0) {
                movieReleaseDate.textContent = `(${contentItem.release_date.split('-')[0]})`
                movieHeader.appendChild(movieReleaseDate)
            }
        }

        return movieHeader.textContent.length
    }

    renderContentSynopsis(contentItem, movieInfoContainer, headerLength) {
        const movieOverview = document.createElement(`p`)

        if (`overview` in contentItem) {
            const synopsisLength = contentItem.overview.length

            if (synopsisLength > 1) {                
                if ((headerLength + synopsisLength) <= this.showInfoMaxLength) {
                    movieOverview.textContent = contentItem.overview
                }
                else {
                    movieOverview.textContent = `${contentItem.overview.substring(0, this.showInfoMaxLength)} ...`;
                }
            }

            else {
                movieOverview.textContent = `Aucun synopsis pour ce film`
            }
        }
        else {
            movieOverview.textContent = `Aucun synopsis pour ce film`
        }

        movieInfoContainer.appendChild(movieOverview)
    }
}
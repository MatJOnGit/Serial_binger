class FilteredTVShowList extends FilteredContentList {
    constructor(tvShowItems) {
        super(tvShowItems)
        this._tvShowDetailsBaseURL = `index.php?action=getShowDetails&type=tv&id=`
    }

    get tvShowDetailsBaseURL() { return this._tvShowDetailsBaseURL }

    // Call methods to render all show data
    renderContentItems(contentItem) {
        const tvShowCard = this.renderContentCard()
        const tvShowLink = this.renderContentLink(contentItem, tvShowCard)
        const tvShowPosterContainer = this.renderContentPosterContainer(tvShowLink)
        this.renderContentPoster(contentItem, tvShowPosterContainer)
        const tvShowInfoContainer = this.renderContentInfoContainer(tvShowLink)
        const tvShowHeaderLength = this.renderTVShowHeader(contentItem, tvShowInfoContainer)
        this.renderContentSynopsis(contentItem, tvShowInfoContainer, tvShowHeaderLength)
    }

    renderContentLink(contentItem, contentCard) {
        const contentLink = document.createElement(`a`)
        contentLink.href = `${this.tvShowDetailsBaseURL}${contentItem.id}`
        contentCard.appendChild(contentLink)
        return contentLink
    }

    renderContentPoster(contentItem, tvShowPosterContainer) {
        if (`poster_path` in contentItem) {
            if (contentItem.poster_path != null) {
                const tvShowPoster = document.createElement(`img`)
                tvShowPoster.src = `${this.posterBaseURL}${contentItem.poster_path}`
                tvShowPosterContainer.appendChild(tvShowPoster)
            }
            else {
                const sadFaceIcon = document.createElement(`i`)
                tvShowPosterContainer.style.backgroundColor = `lightslategrey`
                sadFaceIcon.className = `far fa-frown`
                tvShowPosterContainer.appendChild(sadFaceIcon)
            }
        } else {
            tvShowPosterContainer.style.backgroundColor = `lightslategrey`
        }
    }

    renderTVShowHeader(contentItem, tvShowInfoContainer) {
        const tvShowHeader = document.createElement('div')
        const tvShowTitle = document.createElement(`h5`)
        const tvShowFirstAiringDate = document.createElement('span')
        
        tvShowHeader.classList = `show-header`
        tvShowTitle.textContent = `${contentItem.name}`
        tvShowInfoContainer.appendChild(tvShowHeader)
        tvShowHeader.appendChild(tvShowTitle)

        if (`first_air_date` in contentItem) {
            if (contentItem.first_air_date.length > 0) {
                tvShowFirstAiringDate.textContent = `(${contentItem.first_air_date.split('-')[0]})`
                tvShowHeader.appendChild(tvShowFirstAiringDate)
            }
        }
        
        return tvShowHeader.textContent.length
    }

    renderContentSynopsis(contentItem, tvShowInfoContainer, headerLength) {
        const tvShowOverview = document.createElement(`p`)

        if (`overview` in contentItem) {
            const synopsisLength = contentItem.overview.length

            if (synopsisLength > 1) {
                if ((headerLength + synopsisLength) <= this.showInfoMaxLength) {
                    tvShowOverview.textContent = contentItem.overview
                }
                else {
                    tvShowOverview.textContent = `${contentItem.overview.substring(0, this.showInfoMaxLength)} ...`;
                }
            }

            else {
                tvShowOverview.textContent = `Aucun synopsis pour cette série`
            }
        }
        else {
            tvShowOverview.textContent = `Aucun synopsis pour cette série`
        }

        tvShowInfoContainer.appendChild(tvShowOverview)
    }
}
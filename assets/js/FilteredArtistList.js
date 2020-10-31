class FilteredArtistList extends FilteredContentList {
    constructor(artistItems) {
        super(artistItems)
        this._artistDetailsBaseURL = `index.php?action=getArtistDetails&id=`

        this.jobTitle = {
            'Acting': ['Actrice', 'Acteur'],
            'Camera': ['Cadreur','Cadreuse'],
            'Costume & Make-up': ['Costume & Maquillage','Costume & Maquillage'],
            'Visual Effects': ['Effets visuel','Effets visuel'],
            'Lighting': ['Eclairage', 'Eclairage'],
            'Production': ['Productrice', 'Producteur'],
            'Directing': ['Réalisatrice', 'Réalisateur'],
            'Writing': ['Scénariste', 'Scénariste'],
            'Sound': ['Ingénieure du son', 'Ingénieur du son'],
            'Art': ['Artiste', 'Artiste']
        }
    }

    get artistDetailsBaseURL() { return this._artistDetailsBaseURL }

    // Call methods to render all show data
    renderContentItems(contentItem) {
        const contentCard = this.renderContentCard()
        const contentLink = this.renderContentLink(contentItem, contentCard)
        const contentPosterContainer = this.renderContentPosterContainer(contentLink)
        this.renderContentPoster(contentItem, contentPosterContainer)
        const artistInfoContainer = this.renderContentInfoContainer(contentLink)
        const artistMainDataLength = this.renderArtistHeader(contentItem, artistInfoContainer)
        this.renderArtistContributions(contentItem, artistInfoContainer, artistMainDataLength)
    }

    renderContentPoster(contentItem, artistPosterContainer) {
        if (`profile_path` in contentItem) {

            if (contentItem.profile_path != null) {
                const artistPoster = document.createElement(`img`)
                artistPoster.src = `${this.posterBaseURL}${contentItem.profile_path}`
                artistPosterContainer.appendChild(artistPoster)
            }
            else {
                const sadFaceIcon = document.createElement(`i`)
                artistPosterContainer.style.backgroundColor = `lightslategrey`
                sadFaceIcon.className = `far fa-frown`
                artistPosterContainer.appendChild(sadFaceIcon)
            }
        }
        else {
            artistPosterContainer.style.backgroundColor = `lightslategrey`
        }
    }
    
    renderArtistHeader(contentItem, artistInfoContainer) {
        const artistHeader = document.createElement('div')
        const artistName = document.createElement(`h5`)
        const artistJob = document.createElement('span')
        
        artistHeader.classList = 'artist-header'
        artistName.textContent = `${contentItem.name}`
        artistInfoContainer.appendChild(artistHeader)
        artistHeader.appendChild(artistName)

        if (`known_for_department` in contentItem) {
            for (const [key, value] of Object.entries(this.jobTitle)) {
                if (key === contentItem.known_for_department) {
                    if (contentItem.gender === 1) {
                        artistJob.textContent = `(${value[0]})`
                    }
                    else {
                        artistJob.textContent = `(${value[1]})`
                    }
                    artistHeader.appendChild(artistJob)
                }
            }
        }
        
        return artistHeader.textContent.length
    }

    renderArtistContributions(contentItem, contentInfoContainer) {
        const artistContributionsList = document.createElement(`ul`)
        contentInfoContainer.appendChild(artistContributionsList)

        const maxDisplayedContributions = 3

        if (`known_for` in contentItem) {
            contentItem.known_for.forEach((artistRole, index) => {
                let artistContributionsListItem = document.createElement('li')

                if ((artistRole.media_type === 'movie') && (index <= (maxDisplayedContributions - 1))) {
                    artistContributionsListItem.textContent = `${artistRole.title.charAt(0).toUpperCase()}${artistRole.title.slice(1)}`
                    if (`release_date` in artistRole) {
                        artistContributionsListItem.textContent += ` (${artistRole.release_date.split('-')[0]})`
                    }
                }
                else if ((artistRole.media_type === 'tv') && (index <= (maxDisplayedContributions - 1))) {
                    artistContributionsListItem.textContent = `${artistRole.name.charAt(0).toUpperCase()}${artistRole.name.slice(1)}`
                }
                
                artistContributionsList.appendChild(artistContributionsListItem) 
            })
        }
        else {
            contentOverview.textContent = `Aucune section "known_for pour cet artiste`
        }
    }
}
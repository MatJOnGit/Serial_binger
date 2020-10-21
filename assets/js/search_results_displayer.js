const defaultDisplayedResults = 'movie'
const defaultResultsPage = 1
const key = `9681493c16e2c16cba85aee9de76d451`
const title = document.getElementsByTagName(`h1`)[0]
const searchedItem = title.getElementsByTagName('span')[0].textContent

window.addEventListener('load', () => {
    fetch(`https://api.themoviedb.org/3/search/${defaultDisplayedResults}?api_key=${key}&language=fr-FR&query=${searchedItem}&page=${defaultResultsPage}&include_adult=false`)
    .then(response => response.json())
    .then(movies => {
        let movieSearchResults = new SearchResultsList(movies.results)
        movieSearchResults.displayList()
    })
    .catch(error => console.log(error))
})
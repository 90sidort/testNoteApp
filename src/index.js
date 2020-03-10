import { createNote } from './notes'
import { setFilters } from './filters'
import { renderNotes } from './views'
import { getWeather } from './details'

const addInfoDiv = document.querySelector("div[id='add_info']")
let weatherData

renderNotes()

document.querySelector('#create-note').addEventListener('click', (e) => {
    const id = createNote()
    location.assign(`/edit.html#${id}`)
})

document.querySelector('#delete-notes').addEventListener('click', (e) => {
    localStorage.removeItem('notes')
    location.reload()
})

document.querySelector('#search-text').addEventListener('input', (e) => {
    setFilters({
        searchText: e.target.value
    })
    renderNotes()
})

document.querySelector('#filter-by').addEventListener('change', (e) => {
    setFilters({
        sortBy: e.target.value
    })
    renderNotes()
})

window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        renderNotes()
    }
})

// const render = () => {
//     const weatherParagraph = document.createElement('p')
//     weatherParagraph.setAttribute('id', 'weatherPrgrph')
//     weatherParagraph.setAttribute('data-test', 'notesApp_weatherPrgrph')
//     const dayToday = weatherData.location.localtime
//     const todayDate = dayToday.substring(0,10)
//     weatherParagraph.innerHTML = `Today is: ${todayDate}. Temperature: ${weatherData.current.temperature}°C. Pressure: ${weatherData.current.pressure}hPa.`
//     addInfoDiv.insertBefore(weatherParagraph, addInfoDiv.childNodes[0])
// }
// const weatehrRequest = async () => {
//     weatherData = await getWeather()
//     render()
// }

// weatehrRequest()
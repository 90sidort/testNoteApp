import moment from 'moment'
import { getFilters } from './filters'
import { sortNotes, getNotes } from './notes'

// Generate empty messages
const emptyWork = () => {
    const emptyMessageWork = document.createElement('p')
    emptyMessageWork.textContent = 'No notes in work category'
    emptyMessageWork.setAttribute('data-test', 'notesApp_emptyWork')
    emptyMessageWork.classList.add('empty-message')
    return emptyMessageWork
}

const emptyHome = () => {
    const emptyMessageHome = document.createElement('p')
    emptyMessageHome.setAttribute('data-test', 'notesApp_emptyHome')
    emptyMessageHome.textContent = 'No notes in home category'
    emptyMessageHome.classList.add('empty-message')
    return emptyMessageHome
}

const emptyOther = () => {
    const emptyMessageOther = document.createElement('p')
    emptyMessageOther.setAttribute('data-test', 'notesApp_emptyOther')
    emptyMessageOther.textContent = 'No notes in other category'
    emptyMessageOther.classList.add('empty-message')
    return emptyMessageOther
}

// Generate the DOM structure for a note
const generateNoteDOM = (note) => {
    const noteEl = document.createElement('a')
    const textEl = document.createElement('p')
    const statusEl = document.createElement('p')

    // Setup the note title text
    if (note.title.length > 0) {
        textEl.textContent = note.title
    } else {
        textEl.textContent = 'Unnamed note'
    }
    textEl.classList.add('list-item__title')
    textEl.setAttribute('data-test', 'notesApp_itemTitle')
    noteEl.appendChild(textEl)

    // Setup the link
    noteEl.setAttribute('href', `/edit.html#${note.id}`)
    noteEl.setAttribute('data-test', 'notesApp_itemLink')
    noteEl.classList.add('list-item')

    // Setup the status message
    statusEl.textContent = generateLastEdited(note.updatedAt)
    statusEl.classList.add('list-item__subtitle')
    statusEl.setAttribute('data-test', 'notesApp_itemUpdate')
    noteEl.setAttribute('style', 'display:block; word-wrap:break-word; width:98%')
    noteEl.appendChild(statusEl)

    return noteEl
}

// Render application notes
const renderNotes = () => {
    const notesElWork = document.querySelector('#notes_work')
    const notesElHome = document.querySelector('#notes_home')
    const notesElOther = document.querySelector('#notes_other')
    const counterParagraph = document.querySelector('#note_counter')
    const filters = getFilters()
    const notes = sortNotes(filters.sortBy)
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))

    notesElWork.innerHTML = ''
    notesElHome.innerHTML = ''
    notesElOther.innerHTML = ''
    
    // counter variables
    let countWork = 0
    let countHome = 0
    let countOther = 0

    let allZero = false
    
    if (filteredNotes.length > 0) {
        filteredNotes.forEach((note) => {
            const noteEl = generateNoteDOM(note)
            if (note.category === 'work'){
                notesElWork.appendChild(noteEl)
                countWork ++
            } else if (note.category === 'home') {
                notesElHome.appendChild(noteEl)
                countHome ++
            } else {
                notesElOther.appendChild(noteEl)
                countOther++
            }
            const noteNotes = filteredNotes.length === 1 ? 'note' : 'notes'
            counterParagraph.innerHTML = `You currently have ${filteredNotes.length} ${noteNotes}.`
        })
    } else if (filteredNotes.length === 0) {
        notesElOther.appendChild(emptyOther())
        notesElWork.appendChild(emptyWork())
        notesElHome.appendChild(emptyHome())
        allZero = true
    }
    const countArr = [countWork, countHome, countOther]
    if (allZero === false) {
        for(let i=0; i<countArr.length; i++){
            if (countArr[i] === 0 && i === 0){
                notesElWork.appendChild(emptyWork())
            } else if (countArr[i] === 0 && i === 1) {
                notesElHome.appendChild(emptyHome())
            } else if (countArr[i] === 0 && i === 2) {
                notesElOther.appendChild(emptyOther())
            }
        }
    }
}


const initializeEditPage = (noteId) => {
    const titleElement = document.querySelector('#note-title')
    const bodyElement = document.querySelector('#note-body')
    const dateElement = document.querySelector('#last-edited')
    const notes = getNotes()
    const note = notes.find((note) => note.id === noteId)

    if (!note) {
        location.assign('/index.html')
    }

    titleElement.value = note.title
    bodyElement.value = note.body
    dateElement.textContent = generateLastEdited(note.updatedAt)
}

// Generate the last edited message
const generateLastEdited = (timestamp) => {
    return `Last edited ${moment(timestamp).fromNow()}`
}

export { generateNoteDOM, renderNotes, generateLastEdited, initializeEditPage}
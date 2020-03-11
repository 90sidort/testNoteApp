import uuidv4 from 'uuid/v4'
import moment from 'moment'

let notes = []

// Read existing notes from localStorage
const loadNotes = () => {
    const notesJSON = localStorage.getItem('notes')

    try {
        return notesJSON ? JSON.parse(notesJSON) : []
    } catch (e) {
        return []
    } 
}

// Save the notes to localStorage
const saveNotes = () => {
    localStorage.setItem('notes', JSON.stringify(notes))
}

// Expose notes from module
const getNotes = () => notes

const createNote = () => {
    const id = uuidv4()
    const timestamp = moment().valueOf()

    notes.push({
        id: id,
        title: '',
        body: '',
        priority: false,
        createdAt: timestamp,
        updatedAt: timestamp,
        category: 'work'
    })
    saveNotes()

    return id
}

// Remove a note from the list
const removeNote = (id) => {
    const noteIndex = notes.findIndex((note) => note.id === id)

    if (noteIndex > -1) {
        notes.splice(noteIndex, 1)
        saveNotes()
    }
}

// Sort your notes by one of three ways
const sortNotes = (sortBy) => {
    if (sortBy === 'byEdited') {
        return notes.sort((a, b) => {
            if (a.updatedAt > b.updatedAt) {
                return -1
            } else if (a.updatedAt < b.updatedAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'byCreated') {
        return notes.sort((a, b) => {
            if (a.createdAt > b.createdAt) {
                return -1
            } else if (a.createdAt < b.createdAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'alphabetical') {
        return notes.sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1
            } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1
            } else {
                return 0
            }
        })
    } else {
        return notes
    }
}

const updatePriority = (id) => {
    const note = notes.find((note) => note.id === id)
    const prioritizeElement = document.querySelector('#priority-note')
    if (note.priority === false) { 
        note.priority = true
        prioritizeElement.setAttribute('style', 'background-color: blue; border-bottom: 2px solid navy;')
        prioritizeElement.innerText = 'Unprioritize'
    } else {
        note.priority = false
        prioritizeElement.setAttribute('style', 'background-color: red; border-bottom: 2px solid orangered;')
        prioritizeElement.innerText = 'Prioritize'
    }
    note.updatedAt = moment().valueOf()
    saveNotes()
    return note
}

const buttonPriority = (id) => {
    const createButton = document.createElement('button')
    createButton.setAttribute('id', 'priority-note')
    createButton.setAttribute('class', 'button button--secondary')
    createButton.setAttribute('data-test', 'notesApp_buttonPriority')
    const note = notes.find((note) => note.id === id)
    if (note.priority === false){
        createButton.setAttribute('style', 'background-color: red; border-bottom: 2px solid orangered;')
        createButton.innerText = 'Prioritize'
    } else {
        createButton.setAttribute('style', 'background-color: blue; border-bottom: 2px solid navy;')
        createButton.innerText = 'Unprioritize'
    }
    return createButton
}

const updateNote = (id, updates) => {
    const note = notes.find((note) => note.id === id)

    if (!note) {
        return
    }

    if (typeof updates.title === 'string') {
        note.title = updates.title
        note.updatedAt = moment().valueOf()
    }

    if (typeof updates.body === 'string') {
        note.body = updates.body
        note.updatedAt = moment().valueOf()
    }

    if (typeof updates.category === 'string') { 
        note.category = updates.category
        note.updatedAt = moment().valueOf()
    }

    saveNotes()
    return note
}

notes = loadNotes()

export { getNotes, createNote, removeNote, sortNotes, updateNote, updatePriority, buttonPriority }
import { initializeEditPage, generateLastEdited } from './views'
import { updateNote, removeNote, updatePriority, buttonPriority } from './notes'

const titleElement = document.querySelector('#note-title')
const bodyElement = document.querySelector('#note-body')
const removeElement = document.querySelector('#remove-note')
const dateElement = document.querySelector('#last-edited')
const noteId = location.hash.substring(1)
const filterCategory = document.querySelector('#category')
const buttonPrrtze = buttonPriority(noteId)
const mainContent = document.querySelector('div[id="main_content"]')
mainContent.insertBefore(buttonPrrtze, removeElement)
const prioritizeElement = document.querySelector('#priority-note')

initializeEditPage(noteId)

titleElement.addEventListener('input', (e) => {
    const note = updateNote(noteId, {
        title: e.target.value
    })
    dateElement.textContent = generateLastEdited(note.updatedAt)
})

bodyElement.addEventListener('input', (e) => {
    const note = updateNote(noteId, {
        body: e.target.value
    })
    dateElement.textContent = generateLastEdited(note.updatedAt)
})

filterCategory.addEventListener('change', (e) => {
    const note = updateNote(noteId, {
        category: e.target.value
    })
    dateElement.textContent = generateLastEdited(note.updatedAt)
})

removeElement.addEventListener('click', (e) => {
    removeNote(noteId)
    location.assign('/index.html')
})

prioritizeElement.addEventListener('click', () => {
    const note = updatePriority(noteId)
    dateElement.textContent = generateLastEdited(note.updatedAt)
})

window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        initializeEditPage(noteId)
    }
})
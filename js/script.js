const addButton = document.querySelector('#add-button')
const noteContainer = document.querySelector('#note-container')
const hideNote = document.querySelector('#hide-notes')
const deleteNote = document.querySelector('#delete-notes')
const editNote = document.querySelector('#edit-notes')
const inputTitle = document.querySelector('#input-title')
const inputNote = document.querySelector('#input-note')
const addNotesButton = document.querySelector('#add-note-button')
const successIcon = document.querySelector('#success-message')
const updatedIcon = document.querySelector('#edit-message')
const deleteIcon = document.querySelector('#delete-message')

addNotesButton.addEventListener('click', () => {
    inputTitle.classList.toggle('hidden')
    inputNote.classList.toggle('hidden')
})

const api = "http://localhost:8080/noteSchema"

addButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (form.title.value.trim().length > 0 && form.content.value.trim().length > 0) {
        fetch(
            `${api}/create`, {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({
                title: form.title.value,
                content: form.content.value,
            }),
        }).then((res) => {
            console.log("response:", res);
            successIcon.classList.remove('hidden')
            setTimeout(() => {
                successIcon.classList.add('hidden')
                window.location.reload();
            }, 2000)

        })
    }
    else {
        alert("Enter your note")
    }
})

const getAllNotes = async () => {
    let notesData = await fetch(`${api}/get`)
        .then((data) => {
            return data.json()
        }).catch((err) => {
            console.log(err);
        })
    return notesData
}

const showAllNotes = async () => {
    const notes = await getAllNotes()
    console.log(notes);
    notes.data.forEach((note) => {
        const noteCard = document.createElement('div')
        noteCard.classList.add('note')
        noteCard.innerHTML = `<h3 class="note-title" contentEditable="true">${note.title}</h3>
        <hr>
        <p class="note-content" contentEditable="true">${note.content}</p>
        `;
        noteCard.addEventListener('click', () => {
            displayDetails(note._id)
            noteContainer.classList.remove("grid-cols-2")
            noteCard.style.display = "block"
            hideNote.classList.remove('hidden')
            deleteNote.classList.remove('hidden')
            editNote.classList.remove('hidden')
        })
        hideNote.addEventListener('click', () => {
            displayDetails(note._id)
            noteContainer.classList.add("grid-cols-2")
            noteContainer.querySelectorAll('.note').forEach((item) => {
                item.style.display = "block"
            })
            hideNote.classList.add('hidden')
            deleteNote.classList.add('hidden')
            editNote.classList.add('hidden')
        })
        deleteNote.addEventListener('click', () => {
            if (noteCard.style.display === "block") {
                fetch(
                    `${api}/delete`, {
                    method: "DELETE",
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                    body: JSON.stringify({
                        id: note._id
                    }),
                }).then((res) => {
                    console.log("response:", res);
                    deleteIcon.classList.remove('hidden')
                    setTimeout(() => {
                        deleteIcon.classList.add('hidden')
                        window.location.reload();
                    }, 1000)
                })
            }
        })
        editNote.addEventListener('click', () => {
            if (noteCard.style.display === "block") {
                console.log(noteCard);
                fetch(
                    `${api}/update`, {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                    body: JSON.stringify({
                        id: note._id, title: noteCard.querySelector('.note-title').textContent, content: noteCard.querySelector('.note-content').textContent
                    }),
                }).then((res) => {
                    console.log("response:", res);
                    updatedIcon.classList.remove('hidden')
                    setTimeout(() => {
                        updatedIcon.classList.add('hidden')
                        window.location.reload();
                    }, 1000)
                })
            }
        })
        noteContainer.appendChild(noteCard)
    })
}
showAllNotes()

const displayDetails = async (id) => {
    noteContainer.querySelectorAll('.note').forEach((item) => {
        item.style.display = "none"
    })
}
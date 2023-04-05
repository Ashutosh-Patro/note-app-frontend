const addButton = document.querySelector('#add-button')
const showNotes = document.querySelector('#show-notes')
const noteContainer = document.querySelector('#note-container')
const hideNote = document.querySelector('#hide-notes')
const deleteNote = document.querySelector('#delete-notes')
const editNote = document.querySelector('#edit-notes')

const api = "http://localhost:8080/noteSchema"

addButton.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(form.title.value);
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
            window.location.reload();
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
    notes.notes.forEach((note) => {
        const noteCard = document.createElement('div')
        noteCard.classList.add('note')
        noteCard.innerHTML = `<h3 contentEditable="true">${note.title}</h3>`;
        noteCard.innerHTML += `<p contentEditable="true">${note.content}</p>`;
        noteCard.addEventListener('click', () => {
            displayDetails(note._id)
            noteCard.style.display = "block"
            hideNote.classList.remove('hidden')
            deleteNote.classList.remove('hidden')
            editNote.classList.remove('hidden')
        })
        hideNote.addEventListener('click', () => {
            displayDetails(note._id)
            noteContainer.querySelectorAll('.note').forEach((item) => {
                item.style.display = "block"
            })
            hideNote.classList.add('hidden')
            deleteNote.classList.add('hidden')
            editNote.classList.add('hidden')
        })
        noteContainer.appendChild(noteCard)
    })
}

showNotes.addEventListener('click', () => {
    form.classList.toggle('hidden')
    noteContainer.classList.toggle('hidden')
})

showAllNotes()

const displayDetails = async (id) => {
    noteContainer.querySelectorAll('.note').forEach((item) => {
        item.style.display = "none"
    })
    const note = await getSingleNote(id);
    detailsOverlay.classList.toggle("hidden");
    detailsOverlay.querySelector(".title").textContent = note.note.title
    detailsOverlay.querySelector(".content").textContent = note.note.content
}
const notesContainer = document.getElementsByClassName('notes-container')[0];
const modalContainer = document.getElementsByClassName('modal-container')[0];

const noteForm = document.getElementById('note-form');
const submitBtn = document.getElementById('submit-btn');
const deleteBtn = document.getElementById('delete-btn');

function openModal() {
  modalContainer.style.display = 'block';
  toggleCreateMode(true);
}

function closeModal() {
  modalContainer.style.display = 'none';
  noteForm.reset();
}

function addNote(title, content) {
  const note = document.createElement('div');
  note.classList.add('note');

  note.addEventListener('click', () => {
    // edit note upon click
    modalContainer.style.display = 'block';

    noteForm['title'].value = note.children[0].textContent;
    noteForm['content'].value = note.children[1].textContent;

    toggleCreateMode(false, note);
    waitForDelete(note);
  });

  const head = document.createElement('h1');
  head.appendChild(document.createTextNode(title));

  const para = document.createElement('p');
  para.appendChild(document.createTextNode(content));

  note.appendChild(head);
  note.appendChild(para);

  notesContainer.appendChild(note);
}

function waitForDelete(note) {
  deleteBtn.onclick = () => {
    // if delete button is pressed, delete the note
    note.remove();
    closeModal();
  };
}

function toggleCreateMode(createNote, note = null) {
  submitBtn.onclick = () => {
    const title = noteForm['title'].value;
    const content = noteForm['content'].value;

    // check if title and content contains text
    if (title && content) {
      if (createNote) {
        // create a new note
        addNote(title, content);
      } else {
        // edit an existing note
        note.children[0].innerText = title;
        note.children[1].innerText = content;
      }
      closeModal();
    }
  };
}

window.onclick = (event) => {
  if (event.target == modalContainer) {
    // close modal when outside of modal pressed
    closeModal();
  }
};

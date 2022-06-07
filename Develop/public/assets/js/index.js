// const { nanoid } = require("nanoid");
// const moment = require('moment');

//note change bg js
const note = document.querySelector('.right');
const grayBtn = document.querySelector('.circle.gray');
const pinkBtn = document.querySelector('.pink');
const yellowBtn = document.querySelector('.yellow');
const greenBtn = document.querySelector('.green');
const brownBtn = document.querySelector('.brown');
const whiteBtn = document.querySelector('.white');
const inputEl = document.querySelector(".form-control")
const textareaEl = document.querySelector("textarea");
const borderCancel =()=>{
    const circleEl = document.querySelectorAll('.circle');
    for (var i = 0; i < circleEl.length; i++) {
        circleEl[i].style.boxShadow = "none";
        }        
    }

const changeGray =()=>{
    note.style.backgroundColor = "gray";
    inputEl.style.backgroundColor = "gray";
    inputEl.classList.add('placeholder-white');
    textareaEl.style.backgroundColor = "gray";
    textareaEl.classList.add('placeholder-white');
    textareaEl.style.color = "white";
    borderCancel();
    grayBtn.style.boxShadow = "0 0 0 0.2rem rgb(0 123 255 / 25%";
}


const changeYellow =()=>{
    note.style.backgroundColor = "#FDF698";
    inputEl.style.backgroundColor = "#FDF698";
    inputEl.classList.remove('placeholder-white');
    inputEl.style.color = "black";
    textareaEl.style.backgroundColor = "#FDF698";
    textareaEl.classList.remove('placeholder-white');
    textareaEl.style.color = "black";
    borderCancel();
    yellowBtn.style.boxShadow = "0 0 0 0.2rem rgb(0 123 255 / 25%";
}

const changePink =()=>{
    note.style.backgroundColor = "#E79CA3";
    inputEl.style.backgroundColor = "#E79CA3";
    inputEl.classList.add('placeholder-white');
    inputEl.style.color = "white";
    textareaEl.style.backgroundColor = "#E79CA3";
    textareaEl.classList.add('placeholder-white');
    textareaEl.style.color = "white";
    borderCancel();
    pinkBtn.style.boxShadow = "0 0 0 0.2rem rgb(0 123 255 / 25%";
}

const changeGreen =()=>{
    note.style.backgroundColor = "#84D4CB";
    inputEl.style.backgroundColor = "#84D4CB";
    inputEl.classList.add('placeholder-white');
    inputEl.style.color = "white";
    textareaEl.style.backgroundColor = "#84D4CB";
    textareaEl.classList.add('placeholder-white');
    textareaEl.style.color = "white";
    borderCancel();
    greenBtn.style.boxShadow = "0 0 0 0.2rem rgb(0 123 255 / 25%";
}

const changeBrown =()=>{
    note.style.backgroundColor = "#D7C1A5";
    inputEl.style.backgroundColor = "#D7C1A5";
    inputEl.classList.add('placeholder-white');
    inputEl.style.color = "white";
    textareaEl.style.backgroundColor = "#D7C1A5";
    textareaEl.classList.add('placeholder-white');
    textareaEl.style.color = "white";
    borderCancel();
    brownBtn.style.boxShadow = "0 0 0 0.2rem rgb(0 123 255 / 25%";
}

const changeWhite =()=>{
    note.style.backgroundColor = "white";
    inputEl.style.backgroundColor = "white";
    inputEl.classList.remove('placeholder-white');
    inputEl.style.color = "black";
    textareaEl.style.backgroundColor = "white";
    textareaEl.classList.remove('placeholder-white');
    textareaEl.style.color = "black";
    borderCancel();
    whiteBtn.style.boxShadow = "0 0 0 0.2rem rgb(0 123 255 / 25%";
}
grayBtn.addEventListener('click', changeGray);
pinkBtn.addEventListener('click', changePink);
yellowBtn.addEventListener('click', changeYellow);
greenBtn.addEventListener('click', changeGreen);
brownBtn.addEventListener('click', changeBrown);
whiteBtn.addEventListener('click', changeWhite);

//api

let noteTitle;
let noteText;
let saveNoteBtn;
let newNoteBtn;
let noteList;

if (window.location.pathname === '/notes') {
    noteTitle = document.querySelector('.note-title');
    noteText = document.querySelector('.note-textarea');
    saveNoteBtn = document.querySelector('.save-note');
    newNoteBtn = document.querySelector('.new-note');
    noteList = document.querySelectorAll('.list-container .list-group');
}

// Show an element
const show = (elem) => {
    elem.style.display = 'inline';
};

// Hide an element
const hide = (elem) => {
    elem.style.display = 'none';
};

let activeNote = {};

const getNotes = () =>
    fetch('/api/notes', {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        },
    });

const saveNote = (note) =>
    fetch('/api/notes', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
    });

const updateNote = (id,note) =>
    fetch(`/api/notes/${id}`, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
    });

const deleteNote = (id) =>
    fetch(`/api/notes/${id}`, {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json',
        }
    });

const renderActiveNote = () => {
    // hide(saveNoteBtn);

    if (activeNote.id) {
        // noteTitle.setAttribute('readonly', true);
        // noteText.setAttribute('readonly', true);
        noteTitle.value = activeNote.title;
        noteText.value = activeNote.text;
        note.style.backgroundColor = activeNote.color;
        inputEl.style.backgroundColor = activeNote.color;
        textareaEl.style.backgroundColor = activeNote.color;
    } else {
        // noteTitle.removeAttribute('readonly');
        // noteText.removeAttribute('readonly');
        noteTitle.value = '';
        noteText.value = '';
    }
};

const handleNoteSave = (e) => {
    e.preventDefault();
    console.log(e.target.innerText);
    // const CurrentDate = moment().format('YYYY/MM/DD');
    if(e.target.innerText==="Save"){
        console.log("handleNoteSave");
        console.log(activeNote);
        const updateData = {title: noteTitle.value,text: noteText.value,color: note.style.backgroundColor}
        console.log(updateData);
        updateNote(activeNote.id,updateData).then(() => {
            console.log("after update redender");
            getAndRenderNotes();
            renderActiveNote();
        });
    }else{
        console.log("handleNoteSave add new one");
        const newNote = {
            title: noteTitle.value,
            text: noteText.value,
            id: Math.random().toString(16).slice(2),
            color: note.style.backgroundColor
            // id: nanoid(),
            // date:CurrentDate
        };
        console.log("newNote",newNote);
        saveNote(newNote).then(() => {
            console.log("after save redender");
            getAndRenderNotes();
            renderActiveNote();
        });
    }
    
};

// Delete the clicked note
const handleNoteDelete = (e) => {
  // Prevents the click listener for the list from being called when the button inside of it is clicked
    e.stopPropagation();

    const note = e.target;
    const noteId = JSON.parse(note.parentElement.getAttribute('data-note')).id;

    if (activeNote.id === noteId) {
        activeNote = {};
    }

    deleteNote(noteId).then(() => {
        getAndRenderNotes();
        renderActiveNote();
    });
};

// Sets the activeNote and displays it
const handleNoteView = (e) => {
    e.preventDefault();
    console.log("view note");
    saveNoteBtn.innerHTML = "Save";
    activeNote = JSON.parse(e.target.parentElement.getAttribute('data-note'));
    renderActiveNote();
};

// Sets the activeNote to and empty object and allows the user to enter a new note
const handleNewNoteView = (e) => {
    e.preventDefault();
    console.log("add new note");
    saveNoteBtn.innerHTML = "Add";
    activeNote = {};
    renderActiveNote();
};

const handleRenderSaveBtn = () => {
    console.log("chane");
    if (!noteTitle.value.trim() || !noteText.value.trim()) {
        hide(saveNoteBtn);
    } else {
        show(saveNoteBtn);
    }
};

// Render the list of note titles
const renderNoteList = async (notes) => {
    let jsonNotes = await notes.json();
    if (window.location.pathname === '/notes') {
        noteList.forEach((el) => (el.innerHTML = ''));
    }

    let noteListItems = [];

    // Returns HTML element with or without a delete button
    const createLi = (text, delBtn = true) => {
    const liEl = document.createElement('li');
    liEl.classList.add('list-group-item');

    const spanEl = document.createElement('span');
    spanEl.classList.add('list-item-title');
    spanEl.innerText = text;
    spanEl.addEventListener('click', handleNoteView);

    liEl.append(spanEl);

    if (delBtn) {
        const delBtnEl = document.createElement('i');
        delBtnEl.classList.add(
            'fas',
            'fa-trash-alt',
            'float-right',
            'text-danger',
            'delete-note'
        );
        delBtnEl.addEventListener('click', handleNoteDelete);

        liEl.append(delBtnEl);
    }

    return liEl;
    };

    if (jsonNotes.length === 0) {
        noteListItems.push(createLi('No saved Notes', false));
    }

    jsonNotes.forEach((note) => {
        const li = createLi(note.title);
        li.dataset.note = JSON.stringify(note);
        li.style.backgroundColor = note.color;
        noteListItems.push(li);
    });

    if (window.location.pathname === '/notes') {
        noteListItems.forEach((note) => noteList[0].append(note));
    }
};

// Gets notes from the db and renders them to the sidebar
const getAndRenderNotes = () => getNotes().then(renderNoteList);

if (window.location.pathname === '/notes') {
    saveNoteBtn.addEventListener('click', handleNoteSave);
    newNoteBtn.addEventListener('click', handleNewNoteView);
    noteTitle.addEventListener('keyup', handleRenderSaveBtn);
    noteText.addEventListener('keyup', handleRenderSaveBtn);
}

getAndRenderNotes();

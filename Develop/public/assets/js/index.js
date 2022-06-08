// const { nanoid } = require("nanoid");
// const moment = require('moment');
// const { CurrentDate } = require('../../../helpers/moment');
// import { CurrentDate } from '../../../helpers/moment';

//note change bg js
const note = document.querySelector('.right');
const grayBtn = document.querySelector('.circle.gray');
const pinkBtn = document.querySelector('.pink');
const yellowBtn = document.querySelector('.yellow');
const greenBtn = document.querySelector('.green');
const brownBtn = document.querySelector('.brown');
const whiteBtn = document.querySelector('.white');
const inputEl = document.querySelector(".form-control");
const textareaEl = document.querySelector("textarea");

//default note bg is white;
note.style.backgroundColor = "white";

//colorBtn select reset the border func
const borderCancel =()=>{
    const circleEl = document.querySelectorAll('.circle');
    for (var i = 0; i < circleEl.length; i++) {
        circleEl[i].style.boxShadow = "none";
        }        
    }

//colorBtn select set the note bg and border func
const changeGray =()=>{
    note.style.backgroundColor = "gray";
    inputEl.style.backgroundColor = "gray";
    textareaEl.style.backgroundColor = "gray";
    btnBorderAdd(grayBtn);
}


const changeYellow =()=>{
    note.style.backgroundColor = "#FDF698";
    inputEl.style.backgroundColor = "#FDF698";
    textareaEl.style.backgroundColor = "#FDF698";
    btnBorderAdd(yellowBtn);
}

const changePink =()=>{
    note.style.backgroundColor = "#E79CA3";
    inputEl.style.backgroundColor = "#E79CA3";
    textareaEl.style.backgroundColor = "#E79CA3";
    btnBorderAdd(pinkBtn);
}

const changeGreen =()=>{
    note.style.backgroundColor = "#84D4CB";
    inputEl.style.backgroundColor = "#84D4CB";
    textareaEl.style.backgroundColor = "#84D4CB";
    btnBorderAdd(greenBtn);
}

const changeBrown =()=>{
    note.style.backgroundColor = "#D7C1A5";
    inputEl.style.backgroundColor = "#D7C1A5";
    textareaEl.style.backgroundColor = "#D7C1A5";
    btnBorderAdd(brownBtn);
}

const changeWhite =()=>{
    note.style.backgroundColor = "white";
    inputEl.style.backgroundColor = "white";
    textareaEl.style.backgroundColor = "white";
    btnBorderAdd(whiteBtn);
}

const btnBorderAdd = (btn) =>{
    borderCancel();
    btn.style.boxShadow = "0 0 0 0.2rem rgb(0 123 255 / 25%";
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

//front-end to connect crud api
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

//show the note detail add new one or review 
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

//save or create new note func
const handleNoteSave = (e) => {
    e.preventDefault();
    // console.log(e.target.innerText);
    // const CurrentDate = moment().format('YYYY/MM/DD');
    if(e.target.innerText==="Save"){
        const updateData = {title: noteTitle.value,text: noteText.value, color: note.style.backgroundColor, date:"2022/01/01"}
        if(updateData.title.trim().length===0){
            alert("Please enter the title!")
        }else{
            updateNote(activeNote.id,updateData).then(() => {
            getAndRenderNotes();
            renderActiveNote();
        });
        }
    }else{
        const newNote = {
            title: noteTitle.value,
            text: noteText.value,
            id: Math.random().toString(16).slice(2),
            color: note.style.backgroundColor,
            // id: nanoid(),
            date:'2022/01/01'
        };
        console.log("newNote",newNote);
        if(newNote.title.trim().length===0){
            alert("Please enter the title!")
        }else{
            saveNote(newNote).then(() => {
            getAndRenderNotes();
            renderActiveNote();
        });
        }
    }
    
};

// Delete the clicked note
const handleNoteDelete = (e) => {
  // Prevents the click listener for the list from being called when the button inside of it is clicked
    e.stopPropagation();

    const note = e.target;
    const noteId = JSON.parse(note.parentElement.parentElement.getAttribute('data-note')).id;

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
    saveNoteBtn.innerHTML = "Save";
    activeNote = JSON.parse(e.target.parentElement.getAttribute('data-note'));
    renderActiveNote();
};

//review the note and show the note's bg at right note section
const checkNoteBgColor = (e) =>{
    e.preventDefault();
    switch(note.style.backgroundColor){
        case "white": btnBorderAdd(whiteBtn);
        break;
        case "gray": btnBorderAdd(grayBtn);
        break;
        case "rgb(231, 156, 163)": btnBorderAdd(pinkBtn);
        break;
        case "rgb(253, 246, 152)": btnBorderAdd(yellowBtn);
        break;
        case "rgb(132, 212, 203)": btnBorderAdd(greenBtn);
        break;
        case "rgb(215, 193, 165)": btnBorderAdd(brownBtn);
        break;
    }
}


// Sets the activeNote to and empty object and allows the user to enter a new note
const handleNewNoteView = (e) => {
    e.preventDefault();
    console.log("add new note");
    saveNoteBtn.innerHTML = "Add";
    activeNote = {};
    renderActiveNote();
};

const handleRenderSaveBtn = () => {
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
    const createLi = (text, date , delBtn = true) => {
    const liEl = document.createElement('li');
    liEl.classList.add('list-group-item','d-flex','align-items-center','justify-content-between');
    
    const divEl = document.createElement('div');
    divEl.classList.add('d-flex',"flex-column",'align-items-end','justify-content-between');
    const spantitleEl = document.createElement('span');
    const spanEl = document.createElement('span');
    spantitleEl.classList.add('list-item-title');
    spantitleEl.innerText = text;
    spanEl.innerHTML = date;
    divEl.append(spanEl);

    spantitleEl.addEventListener('click', handleNoteView);
    spantitleEl.addEventListener('click', checkNoteBgColor);

    liEl.append(spantitleEl);
    liEl.append(divEl);

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

        divEl.append(delBtnEl);
    }

    return liEl;
    };

    if (jsonNotes.length === 0) {
        noteListItems.push(createLi('No saved Notes', false));
    }

    jsonNotes.forEach((note) => {
        const li = createLi(note.title, note.date);
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
    // noteTitle.addEventListener('keyup', handleRenderSaveBtn);
    // noteText.addEventListener('keyup', handleRenderSaveBtn);
}

getAndRenderNotes();

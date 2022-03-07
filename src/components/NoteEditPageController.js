import React from 'react';
import NoteEditPage from './NoteEditPage';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import useNotes from '../hooks/useNotes';

export default function NoteEditPageController(){
    const { id } = useParams();
    const history = useHistory();
    const { notes, deleteNote, updateNote } = useNotes();


    const selectedNote = notes.find((note) => note.id === id);
    if(!selectedNote) return null;

    //save
    const handleOnSave= (newText) => {
        updateNote(id, newText)
        history.goBack();
    }
    // //cancel
    // const handleOnCancel = () =>{
    // history.goBack();
    // }

    //delete
    const handleOnDelete = (e) => {
        deleteNote(id)
        history.goBack();
        
    }

    return (
        <NoteEditPage 
        onSave={handleOnSave} 
        // onCancel={handleOnCancel} 
        onDelete={handleOnDelete} 
        text={selectedNote.text} 
        ids={selectedNote.id} />
    )

}
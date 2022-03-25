import React from 'react';
import NoteEditPage from './NoteEditPage';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import useNotes from '../hooks/useNotes';

export default function NoteEditPageController(){
    const { id } = useParams();
    const history = useHistory();
    const { notes, deleteNote, updateNote, archiveNote } = useNotes();


    const selectedNote = notes.find((note) => note.id === id);
    if(!selectedNote) return null;

    //save
    const handleOnSave= (newText) => {
        let text2 = newText.trim(newText);
        if(text2 === ""){
            deleteNote(id)
        }else{
           updateNote(id, text2) 
        }
        history.goBack();
    }

    //delete
    const handleOnDelete = (e) => {
        deleteNote(id)
        history.goBack();
        
    }
    const handleOnArchive= () =>{
        archiveNote(id)
        history.goBack();
    }

    return (
        <NoteEditPage 
        onSave={handleOnSave} 
        onDelete={handleOnDelete} 
        onArchive={handleOnArchive}
        text={selectedNote.text} 
        ids={selectedNote.id} />
    )

}
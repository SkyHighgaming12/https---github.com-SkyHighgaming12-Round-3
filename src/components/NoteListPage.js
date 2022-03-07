import React, { useState } from 'react';
import NoteListItem from './NoteListItem';
import NoteEditPage from './NoteEditPage';
import {
    IonHeader,
    IonPage,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList
}from '@ionic/react';

const initialNotes = [
    {
        id: "1", 
        createdAt: new Date(),
        text: "Note 1 BabyYYYYYYYYYYYY"
    },
    {
        id: "2", 
        createdAt: new Date(),
        text: "Note 2 BabyYYYYYYYYYYYY"
    },
    {
        id: "3", 
        createdAt: new Date(),
        text: "React _is_ **fun**!"
    }
];
export default function NoteListPage(props){
    const[selectedNoteId, setSelectedNoteId] = useState(null);
    const[notes, setNotes] = useState(initialNotes);
    //save
    const handleOnSave= (newNoteText) => {
        const updatedNotes = notes.map((note) =>{
            if(note.id===selectedNoteId){
                return{
                    ...note,
                    text: newNoteText
                };
            }
            return note;
        });
        setNotes(updatedNotes); 
        setSelectedNoteId(null);
    }
    //cancel
    const handleOnCancel = () =>{
        setSelectedNoteId(null);
    }
    //delete
    const handleOnDelete = (e) => {
        setSelectedNoteId(null);
        setNotes(notes.filter((es)=>(es.id !== e)));
    }
    //Click to edit
    if (selectedNoteId){
        const selectedNote = notes.find((note) => note.id === selectedNoteId)
        return (
            <NoteEditPage onSave={handleOnSave} onCancel={handleOnCancel} onDelete={handleOnDelete} text={selectedNote.text} ids={selectedNote.id} />
        )
    }
    const handleListItemClick = (id) => {
        setSelectedNoteId(id)
    }
//list page
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Note List</IonTitle>
                </IonToolbar>
            </IonHeader>
            
            <IonContent>
                <IonList lines="full">
                    {
                        notes.map((note) => {
                            return(
                                <NoteListItem 
                                    id={note.id}
                                    key={note.id}
                                    text={note.text}
                                    createdAt= {note.createdAt}
                                    onclick={handleListItemClick}
                                />
                            )
                        })
                    }
                </IonList>
            </IonContent>
        </IonPage>
    )
}


 
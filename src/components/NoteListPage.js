import React, { useState } from 'react';
import NoteListItem from './NoteListItem';
import { useHistory } from 'react-router-dom';
import {
    IonHeader,
    IonPage,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonFab,
    IonFabButton,
    IonIcon,
    IonButton,
    IonButtons
}from '@ionic/react';
import useNotes from '../hooks/useNotes'
import { 
    add,
    funnel
 } from 'ionicons/icons';
 import { useTranslation } from "react-i18next";



export default function NoteListPage(props){
    const history = useHistory();
    const { notes, createNote } = useNotes();
    const [filter, setFilter] = useState(true);
    const { t } = useTranslation();


    let copy;
    if(filter){
        copy = notes.filter((e)=> e.isArchived !== true)
    }else{
        copy = notes
    }
    const handleListItemClick = (id) => {
        history.push(`/notes/edit/${id}`);
    }
    const handleNewNoteClick = () => {
        const { id } = createNote();
        history.push(`/notes/edit/${id}`)
    }
    const handleToggle = () => {
        if(filter){
            setFilter(false)
        }else{
            setFilter(true)
        }
    }
    
    
//list page
    return (
        <IonPage>
            <IonHeader className='header'>
                <IonToolbar>
                    <IonTitle>{t("noteListPageTitle")}</IonTitle>
                    <IonButtons slot='primary'>
                        <IonButton color="secondary" onClick={() => handleToggle()}>
                            <IonIcon slot="icon-only" icon={funnel} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            
            <IonContent className="notes">
                <IonList lines="full">
                    {
                        copy.map((note) => {
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
                <IonFab vertical="bottom" horizontal='end' slot='fixed'>
                    <IonFabButton onClick={handleNewNoteClick}>
                        <IonIcon icon={add} />    
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    )
}


 
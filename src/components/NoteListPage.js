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
// import useNotes from '../hooks/useNotes'
import { 
    add,
    funnel
 } from 'ionicons/icons';
 import { useTranslation } from "react-i18next";
 import { gql, useMutation, useQuery } from "@apollo/client";

export const GET_NOTES = gql`
    {
        notes(isArchived: true){
            id
            createdAt
            isArchived
            text
        }
    }
`;

const CREATE_NOTE = gql`
    mutation createNote($note: CreateNoteInput!){
        createNote(note: $note){
            id
            createdAt
            isArchived
            text
        }
    }
`;


export default function NoteListPage(props){
    const [createNote] = useMutation(CREATE_NOTE, {
        onCompleted(data){
            if(data && data.createNote){
                const id = data.createNote.id;
                history.push(`/notes/edit/${id}`);
            }
        },
        refetchQueries: [
            {
                query: GET_NOTES
            }
        ]
    })
    
    const { data } = useQuery(GET_NOTES, {
        pollInterval: 5000
    })
    const history = useHistory();
    // const { notes, createNote } = useNotes();
    const [filter, setFilter] = useState(true);
    const { t } = useTranslation();
    const notes = (data && data.notes) || [];


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
        createNote({
            variables: {
                note: {
                    text: ""
                }
            }
        });
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
                                    createdAt= {new Date(note.createdAt)}
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


 
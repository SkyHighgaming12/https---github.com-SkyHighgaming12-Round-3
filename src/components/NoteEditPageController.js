import React from 'react';
import NoteEditPage from './NoteEditPage';
 import { gql, useMutation, useQuery } from "@apollo/client";
 import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import useNotes from '../hooks/useNotes';
import { GET_NOTES } from './NoteListPage';

const GET_ONE_NOTE = gql`
    query note($id: ID!){
        note(id: $id) {
            id
            createdAt
            isArchived
            text
        }
    }
`;

const UPDATE_NOTE = gql`
    mutation updateNote($id: ID!, $note: UpdateNoteInput!){
        updateNote(
            id: $id
            note: $note
        )
        {
            isArchived
            text
        }
    }
`;

const DELETE_NOTE = gql`
    mutation deleteNote($id: ID!){
        deleteNote(
            id: $id
        )
        {
            isArchived
            text
        }
    }
`;
export default function NoteEditPageController(){
    const [updateNote] = useMutation(UPDATE_NOTE, {
        onCompleted(data){
            if (data && data.updateNote){
                history.goBack();
            }
        },
        refetchQueries: [
            {
                query: GET_NOTES
            }
        ]
    });
    const [deleteNote] = useMutation(DELETE_NOTE, {
        onCompleted(data){
            if(data && data.deleteNote){
                history.goBack();
            }
        },
        refetchQueries: [
            {
                query: GET_NOTES
            }
        ]
    })

    const { id } = useParams();
    const history = useHistory();
    const { data } = useQuery(GET_ONE_NOTE, {
        variables: {
            id
        }
    })
    const [archiveNote] = useMutation(UPDATE_NOTE, {
        onCompleted(data){
            if (data && data.archiveNote){
                history.goBack();
            }
        },
        refetchQueries: [
            {
                query: GET_NOTES
            }
        ]
    });

    const selectedNote = data && data.note;
    // const selectedNote = notes.find((note) => note.id === id);
    if(!selectedNote) return null;

    //save
    const handleOnSave= (newText) => {
        let text2 = newText.trim(newText);
        if(text2 === ""){
            deleteNote({
                variables: {
                    id : id
                }
            })
        }else{
           updateNote({
            variables: {
                id : id,
                note: {
                    isArchived: false,
                    text: text2
                }
            }
        }) 
        }
        history.goBack();
    }

    //delete
    const handleOnDelete = (e) => {
        deleteNote({
            variables: {
                id : id
            }
        })
        history.goBack();
        
    }
    const handleOnArchive= () =>{
        archiveNote({
            variables: {
                id : id,
                note: {
                    isArchived: true
                }
            }
        })
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
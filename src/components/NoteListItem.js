import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import FormateDate from './../util/formateDate';
import FormaText from './../util/formatNoteItemText';
import {
    IonLabel,
    IonItem
}from '@ionic/react';


export default function NoteListItem(props) {
    
    const{
        id, 
        text,
        createdAt,
        onclick
    } = props;

    const handleItemClick = (event) => {
        event.preventDefault();
        if(onclick){
            onclick(id);
        }
    }
    return(
        <IonItem onClick={handleItemClick}>
            <IonLabel>
                <ReactMarkdown children={FormaText(text)} />
                <p>{FormateDate(createdAt)}</p>
            </IonLabel>
        </IonItem>
    )
}

NoteListItem.propTypes = {
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    createdAt: PropTypes.instanceOf(Date).isRequired,
    onclick: PropTypes.func
}
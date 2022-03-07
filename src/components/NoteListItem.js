import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import FormateDate from './../util/formateDate'
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

    const emptyText = (text) =>{
        let text2 = text.trim(text);
        if(text2 === ""){
            text2 = 'No Note Text';
        }
        if(text2 === " "){
            text2 = 'No Note Text';
        }
        return(text2);
    }
    

    const handleItemClick = (event) => {
        event.preventDefault();
        
        if(onclick){
            onclick(id);
        }
    }
    // const [timesClicked, setTimesClicked] = useState(0);
    
    return(
        <IonItem onClick={handleItemClick}>
            <IonLabel>
                <ReactMarkdown children={emptyText(truncate(text))} />
                <p>{FormateDate(createdAt)}</p>
                {/* <p>Ive been clicked {timesClicked} times</p> */}
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
function truncate(str) {
    return str.length > 200 ? str.substring(0, 197) + "..." : str;
}

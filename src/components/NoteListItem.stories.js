import React from 'react';
import {action} from '@storybook/addon-actions'
import NoteListItem from './NoteListItem';

export default {
    Title: "NoteListItem",
    Component: NoteListItem
};

//short text
export const ShortText = () =>{
    return (<NoteListItem id="1" createdAt={new Date()} text="Haha Shorty" /> );
}


//long text
export const LongText = () =>{
    return (<NoteListItem id="1" createdAt={new Date()} text="Prow scuttle parrel provost Sail ho shrouds spirits boom mizzenmast yardarm. Pinnace holystone mizzenmast quarter crow's nest nipperkin grog yardarm hempen halter furl. Swab barque interloper chantey doubloon starboard grog black jack gangway rutters.

    Deadlights jack lad schooner scallywag dance the hempen jig carouser broadside cable strike colors. Bring a spring upon her cable holystone blow the man down spanker Shiver me timbers to go on account lookout wherry doubloon chase. Belay yo-ho-ho keelhaul squiffy black spot yardarm spyglass sheet transom heave to.
    
    Trysail Sail ho Corsair red ensign hulk smartly boom jib rum gangway. Case shot Shiver me timbers gangplank crack Jennys tea cup ballast Blimey lee snow crow's nest rutters. Fluke jib scourge of the seven seas boatswain schooner gaff booty Jack Tar transom spirits." /> );
}

//markdown text
export const MarkdownText = () =>{
    return (<NoteListItem id="1" createdAt={new Date()} text="**Markdown**" /> );
}
const sixDaysAgo = Date.now() - (6 * 24 * 60 * 60 * 1000);
const twoWeeksAgo = Date.now() - (14 * 24 * 60 * 60 * 1000);
//created less than 1 week ago
export const LessWeekText = () =>{
    const createdAt = new Date(sixDaysAgo);
    return (<NoteListItem id="1" createdAt={createdAt} text="Less than 1 week" /> );
}
//created more than 1 week ago
export const MoreWeekText = () =>{
    const createdAt = new Date(twoWeeksAgo);
    return (<NoteListItem id="1" createdAt={createdAt} text="more than 1 week" /> );
}
//click action 
export const ClickAction = () =>{
    return (<NoteListItem 
        id="1" 
        createdAt={new Date()} 
        onclick={action("onclick")}
        text="Clicked" 
        /> );
}
//empty state
export const EmptyText = () =>{
    return (<NoteListItem id="1" createdAt={new Date()} text="" /> );
}
//spaces
export const SpacesText = () =>{
    return (<NoteListItem id="1" createdAt={new Date()} text="    " /> );
}

//error state
export const ErrorOnClick = () =>{
    const onClick = () => {
        throw new Error("Simulated Error")
    };
    return (<NoteListItem id="1" onclick={onClick} createdAt={new Date()} text="Error" /> );
}

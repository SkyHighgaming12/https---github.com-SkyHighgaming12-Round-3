import React from 'react';
import NoteEditPage from './NoteEditPage';

export default {
    Title: "NoteEditPage",
    Component: NoteEditPage
};

export const Text = () =>{
    return (<NoteEditPage  text='test' ids='1' /> );
}
export const blankText = () =>{
    return (<NoteEditPage    /> );
}

export const save = () =>{
    const onClick = () => {
        alert("save")
    }
    return (<NoteEditPage  onSave={onClick} text='test' ids='1' /> );
}
export const deleted = () =>{
    const onClick = () => {
        alert("delete")
    }
    return (<NoteEditPage  onDelete={onClick} text='test' ids='1' /> );
}
export const cancel = () =>{
    const onClick = () => {
        alert("Cancel")
    }
    return (<NoteEditPage  onCancel={onClick} text='test' ids='1' /> );
}
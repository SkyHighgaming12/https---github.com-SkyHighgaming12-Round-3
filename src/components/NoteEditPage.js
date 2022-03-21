import React, {useState} from 'react';
import {
    IonHeader,
    IonPage,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonIcon,
    IonActionSheet,
    useIonAlert,
    IonAlert
}from '@ionic/react';
import { 
    chevronBack, 
    ellipsisHorizontal, 
    trash, 
    close, 
    // closeCircle 
} 
    from 'ionicons/icons';
import styles from './NoteEditPage.module.css';

export default function NoteEditPage(props) {
const {
    text, 
    onSave,
    // onCancel,
    onDelete,
    ids
} = props;
const [value, setValue] = useState(text)
const [showActions, setShowActions] = useState(false)
const [showAlert1, setShowAlert1] = useState(false)
    return(
        <IonPage>
            <IonHeader className="header">
                <IonToolbar>
                    <IonButtons slot="secondary">
                        <IonButton color="secondary" onClick={() => onSave(value)}>
                            <IonIcon slot="icon-only" icon={chevronBack} />
                        </IonButton>
                    </IonButtons>
                    <IonTitle>
                        Note Edit
                    </IonTitle>
                    <IonButtons slot='primary'>
                        <IonButton color="secondary" onClick={() => setShowActions(true)}>
                            <IonIcon slot="icon-only" icon={ellipsisHorizontal} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <textarea className={styles.textArea} value={value} onChange={(event) => setValue(event.target.value)} /><br />
            </IonContent>
            <IonActionSheet
                isOpen={showActions}
                onDidDismiss={() => setShowActions(false)}
                buttons={[
                    {
                        text: 'Delete',
                        role: 'destructive',
                        icon: trash,
                        handler: () => setShowAlert1(true)
                    },
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        icon: close,
                        handler: () => setShowActions(false)
                    }
                ]}
            >     
            {/* () => onDelete(ids) */}
            </IonActionSheet>
            <IonAlert
                isOpen={showAlert1}
                onDidDismiss={() => setShowAlert1(false)}
                cssClass='my-custom-class'
                header={'Delete'}
                message={'Are you sure you want to delete this note?'}
                buttons={[
                    {
                        text: 'Yes',
                        role: 'destructive',
                        icon: trash,
                        handler: () => onDelete(ids)
                    },
                    {
                        text: 'No',
                        role: 'cancel',
                        icon: close,
                        handler: () => setShowActions(false)
                    }
                ]}
            />
        </IonPage>
    )
}

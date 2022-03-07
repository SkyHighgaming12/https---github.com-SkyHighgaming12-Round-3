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
    IonActionSheet
}from '@ionic/react';
import { chevronBack, ellipsisHorizontal, trash, close, closeCircle } from 'ionicons/icons';
import styles from './NoteEditPage.module.css';

export default function NoteEditPage(props) {
const {
    text, 
    onSave,
    onCancel,
    onDelete,
    ids
} = props;
const [value, setValue] = useState(text)
const [showActions, setShowActions] = useState(false)
    return(
        <IonPage>
            <IonHeader>
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
                        handler: () => onDelete(ids)
                    },
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        icon: close,
                        handler: () => setShowActions(false)
                    },
                    {
                        text: 'Cancel Edit',
                        icon: closeCircle,
                        handler: () => onCancel()
                    }
                ]}
            >
                    
            </IonActionSheet>
        </IonPage>
    )
}

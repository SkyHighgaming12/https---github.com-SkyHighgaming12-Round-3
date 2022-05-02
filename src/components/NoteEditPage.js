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
    IonAlert
}from '@ionic/react';
import { 
    chevronBack, 
    ellipsisHorizontal, 
    trash, 
    close, 
    fileTray
} 
    from 'ionicons/icons';
import styles from './NoteEditPage.module.css';
import { useTranslation } from "react-i18next";


export default function NoteEditPage(props) {
const {
    text, 
    onSave,
    onDelete,
    onArchive,
    ids
} = props;
const [value, setValue] = useState(text)
const [showActions, setShowActions] = useState(false)
const [showAlert1, setShowAlert1] = useState(false)
const { t } = useTranslation();

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
                    {t("noteEditPageTitle")}
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
                        text: t("delete"),
                        role: 'destructive',
                        icon: trash,
                        handler: () => setShowAlert1(true)
                    },
                    {
                        text: t("archive"),
                        icon: fileTray,
                        handler: () => onArchive(ids)
                    },
                    {
                        text: t("cancel"),
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
                header={t("delete")}
                message= {t("confirm")}
                buttons={[
                    {
                        text: t("yes"),
                        role: 'destructive',
                        icon: trash,
                        handler: () => onDelete(ids)
                    },
                    {
                        text: t("no"),
                        role: 'cancel',
                        icon: close,
                        handler: () => setShowActions(false)
                    }
                ]}
            />
        </IonPage>
    )
}

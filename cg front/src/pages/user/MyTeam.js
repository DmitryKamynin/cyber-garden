import React, { useContext, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import MaskedInput from 'react-text-mask';
import * as Yup from 'yup';

import {GlobalContext} from '../../state/context/globalStateContext';

import useAuth from '../../hooks/useAuth';
import useTgCode from '../../hooks/useTgCode';

import Tamplate from '../../components/Tamplate';
import UserNavBar from '../../components/UserNavBar';

import styles from '../../styles/pages/UserAccount.module.css';
import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';

export default function MyTeam() {
    const { createHandler } = useAuth();
    const [copy, setCopy] = useState(false);

    const [message, setMessage] = useState(false);
    const { globalState } = useContext(GlobalContext);

    const phoneRegExp = /^(\+7|[78])(\s?|\-?)(\(\d{3}\)|\d{3})(\-?|\s?)\d{3}(\-?|\s?)\d{2}(\-?|\s?)\d{2}$/;
    const validationSchema = Yup.object().shape( { 
        // username: Yup.string().matches(phoneRegExp, 'Некорректный номер телефона').required('Номер телефона обязателен'),
    } );

    const { userData } = globalState;

    const initValues={
        title: globalState?.userData?.team?.title || '',
        description: globalState?.userData?.description || '',
    };

    return (
        <>
            <Tamplate>
                <UserNavBar/> 
                <Formik
                    initialValues={initValues}
                    validateOnChange={false}
                    validationSchema={validationSchema}
                    onSubmit={ async (values, api) => {
                        
                        const result = await createHandler(values);
                        if(result.ok) setMessage(true);
                        api.setSubmitting(false);
                    }}
                >
                    {({errors, touched, dirty, values, handleChange}) => (
                        <Form className={styles.form}>
                            <h2 className={styles.title}>Создать команду</h2>

                            <p className={styles.formDescription}>Как называется ваша команда?</p>

                            <div className={styles.fieldWrapper}>

                                <div className={styles.fieldContainer} >
                                    <Field disabled={userData.team.id} className={styles.field} name='title' placeholder='Классная команда *'/>
                                </div>

                            </div>
   

                            <div className={styles.fieldWrapper}>
                                <p className={styles.formDescription}>Напиши немного слов о своей команде!:)</p>
                            </div>

                            <div className={styles.fieldWrapper}>
                                <Field as='textarea'
                                    disabled={userData.team.id}
                                    name='description'
                                    style={{height: '100%', maxHeight: '150px', minHeight: '150px'}}
                                    placeholder='Классное описание'
                                    className={styles.field}
                                >
                                    {values.description}
                                </Field>
                            </div>

                           {userData.team.id ? null : <Button classes={{root:styles.btnSucces}} disabled={!dirty} type='submit'>
                                {dirty ? 'Сохранить' : 'Измените данные'}
                            </Button>}
                        </Form>
                    )}
                </Formik>


            </Tamplate>

            <Dialog
                open={message}
                onClose={() => {
                    setMessage(null);
                }}
            >
                <DialogTitle 
                    classes={{
                        root: styles.dialogContentBg,
                    }}
                >
                    Команда успешно создана!
                </DialogTitle>

                <DialogActions
                    classes={{
                        root: styles.dialogContentBg,
                    }}
                >
                    <Button type='button' onClick={() => {
                        setMessage(null);
                    }}>
                        Закрыть окно
                    </Button>

                </DialogActions>
            </Dialog>
        </>
    )
}


import React, { useContext } from 'react';
import { Field, Form, Formik } from 'formik';
import MaskedInput from 'react-text-mask';
import * as Yup from 'yup';

import {GlobalContext} from '../../state/context/globalStateContext';

import useAuth from '../../hooks/useAuth';

import Tamplate from '../../components/Tamplate';
import UserNavBar from '../../components/UserNavBar';

import styles from '../../styles/pages/UserAccount.module.css';
import { Button } from '@material-ui/core';

export default function UserAccount() {
    const { changeHandler } = useAuth();

    const { globalState, dispatch } = useContext(GlobalContext);


    const phoneRegExp = /^(\+7|[78])(\s?|\-?)(\(\d{3}\)|\d{3})(\-?|\s?)\d{3}(\-?|\s?)\d{2}(\-?|\s?)\d{2}$/;
    const validationSchema = Yup.object().shape( { 
        // username: Yup.string().matches(phoneRegExp, 'Некорректный номер телефона').required('Номер телефона обязателен'),
    } );

    const initValues={
        last_name: globalState?.userData?.last_name || '',
        first_name: globalState?.userData?.first_name || '',
        patronymic: globalState?.userData?.patronymic || '',
        username: globalState?.userData?.username || '',
        city: globalState?.userData?.city || '',
        telegram: globalState?.userData?.telegram || '',
        user: globalState?.userData?.id || '',
    }

    return (
        <>
            <Tamplate>
                <UserNavBar/> 
                <Formik
                    initialValues={initValues}
                    validateOnChange={false}
                    validationSchema={validationSchema}
                    onSubmit={ async (values, api) => {
                        const result = await changeHandler(values);
                        api.setSubmitting(false);
                    }}
                >
                    {({errors, touched, isSubmiting, dirty}) => (
                        <Form className={styles.form}>
                            <h2 className={styles.title}>Личные данные</h2>

                            <p className={styles.formDescription}>Заполните ваши личные данные</p>

                            <div className={styles.fieldWrapper}>

                                <div style ={{position: 'relative', width: '100%', marginRight: '10px'}}>
                                    <Field className={styles.field} name='last_name' placeholder='Фамилия *'/>
                                </div>

                                <div style ={{position: 'relative', width: '100%', marginRight: '10px'}}>
                                    <Field className={`${styles.field} ${errors.first_name ? styles.fieldError : null}`} name='first_name' placeholder='Имя *'/>
                                </div>

                                <div style ={{position: 'relative', width: '100%', marginRight: '10px'}}>
                                    <Field className={`${styles.field} ${errors.patronymic ? styles.fieldError : null}`} name='patronymic' placeholder='Отчество *'/>
                                </div>

                            </div>

                            <div className={styles.fieldWrapper}>

                                <div style ={{position: 'relative', width: '100%', marginRight: '10px'}}>
                                    <Field name='username' render={
                                        ({field}) => <MaskedInput
                                            {...field}
                                            placeholder='Телефон *'
                                            className={`${styles.field} ${errors.username ? styles.fieldError : null}`} 
                                            mask={['+', '7', '(', /\d/, /\d/, /\d/,')', /\d/, /\d/, /\d/, '-', /\d/, /\d/,'-', /\d/, /\d/,] }
                                            />
                                    }/>
                                    {errors.username && touched.username ? <div className={styles.textError}>{errors?.username}</div> : null}
                                </div>

                                <div style ={{position: 'relative', width: '100%', marginRight: '10px'}}>
                                    <Field className={`${styles.field} ${errors.first_name ? styles.fieldError : null}`} name='city' placeholder='Город *'/>
                                </div>

                                <div style ={{position: 'relative', width: '100%', marginRight: '10px'}}>
                                    <input 
                                        name='telegram'
                                        disabled
                                        className={`${styles.field} ${errors.telegram ? styles.fieldError : null}`} 
                                        placeholder='Телеграм *'
                                    />
                                </div>
                            </div>

                            <Button classes={{root:styles.btnSucces}} disabled={!dirty} type='submit'>
                                {dirty ? 'Сохранить' : 'Измените данные'}
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Tamplate>
        </>
    )
}


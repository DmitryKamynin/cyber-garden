import React, { useContext } from 'react';
import { Field, Form, Formik } from 'formik';
import MaskedInput from 'react-text-mask';
import * as Yup from 'yup';

import {GlobalContext} from '../../state/context/globalStateContext';

import {useHttp} from '../../hooks/useHttp';

import Tamplate from '../../components/Tamplate';
import UserNavBar from '../../components/UserNavBar';

import styles from '../../styles/pages/UserAccount.module.css';

export default function UserAccount() {
    const { request } = useHttp();
    const { GlobalState, dispatch } = useContext(GlobalContext);


    const phoneRegExp = /^(\+7|[78])(\s?|\-?)(\(\d{3}\)|\d{3})(\-?|\s?)\d{3}(\-?|\s?)\d{2}(\-?|\s?)\d{2}$/;
    const validationSchema = Yup.object().shape( { 
        phone: Yup.string().matches(phoneRegExp, 'Некорректный номер телефона').required('Номер телефона обязателен'),
    } );

    const initValues={
        last_name: '',
        first_name: '',
        patronymic: '',
    }

    return (
        <>
            <Tamplate>
                <UserNavBar/> 
                <Formik
                    initialValues={initValues}
                    validateOnChange={false}
                    validationSchema={validationSchema}
                >
                    {({errors, touched}) => (
                        <Form className={styles.form}>
                            <h2>Личные данные</h2>

                            <div className={styles.fieldWrapper}>

                                <div style ={{position: 'relative'}}>
                                    <Field className={styles.field} name='last_name' placeholder='Фамилия *'/>
                                </div>

                                <div>
                                    <Field className={`${styles.field} ${errors.first_name ? styles.fieldError : null}`} name='first_name' placeholder='Имя *'/>
                                </div>

                                <div>
                                    <Field className={`${styles.field} ${errors.patronymic ? styles.fieldError : null}`} name='patronymic' placeholder='Отчество *'/>
                                </div>

                            </div>

                            <div className={styles.fieldWrapper}>

                                <div style ={{position: 'relative'}}>
                                    <Field name='phone' render={
                                        ({field}) => <MaskedInput
                                            {...field}
                                            placeholder='Телефон *'
                                            className={`${styles.field} ${errors.phone ? styles.fieldError : null}`} 
                                            mask={['+', '7', '(', /\d/, /\d/, /\d/,')', /\d/, /\d/, /\d/, '-', /\d/, /\d/,'-', /\d/, /\d/,] }
                                            />
                                    }/>
                                    {errors.phone && touched.phone ? <div className={styles.textError}>{errors?.phone}</div> : null}
                                </div>

                                <div>
                                    <Field className={`${styles.field} ${errors.first_name ? styles.fieldError : null}`} name='city' placeholder='Город *'/>
                                </div>

                                <div>
                                    <Field 
                                        name='telegram' 
                                        render={
                                            ({field}) => <MaskedInput
                                                {...field}
                                                placeholder='Телеграм *'
                                                className={`${styles.field} ${errors.telegram ? styles.fieldError : null}`} 
                                                mask={['@']}
                                        />
                                    }/>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Tamplate>
        </>
    )
}


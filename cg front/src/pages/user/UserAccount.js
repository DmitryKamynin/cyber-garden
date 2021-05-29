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

export default function UserAccount() {
    const { changeHandler } = useAuth();
    const { getTgCode, code } = useTgCode();
    const [copy, setCopy] = useState(false);

    const [message, setMessage] = useState(false);
    const { globalState } = useContext(GlobalContext);


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
        description: globalState?.userData?.description || '',
    }

    const validationPass = Yup.object().shape( { 
        password: Yup.string().min(4, "Пароль должен состоять минимум из 4 символов").required('Пароль обязателен'),
        repeatedPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Пароли не совпадают!').required('Подтвердите пароль'),
    } );

    const initPass={
        password: '',
        repeatedPassword: '',
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
                        if(result.ok) setMessage(true);
                        api.setSubmitting(false);
                    }}
                >
                    {({errors, touched, dirty, values, handleChange}) => (
                        <Form className={styles.form}>
                            <h2 className={styles.title}>Личные данные</h2>

                            <p className={styles.formDescription}>Заполните ваши личные данные</p>

                            <div className={styles.fieldWrapper}>

                                <div style ={{position: 'relative', width: '100%', marginRight: '10px'}}>
                                    <Field className={styles.field} name='last_name' placeholder='Фамилия *'/>
                                </div>

                                <div style ={{position: 'relative', width: '100%', marginRight: '10px'}}>
                                    <Field className={styles.field} name='first_name' placeholder='Имя *'/>
                                </div>

                                <div style ={{position: 'relative', width: '100%'}}>
                                    <Field className={styles.field} name='patronymic' placeholder='Отчество *'/>
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
                                    <Field className={styles.field} name='city' placeholder='Город *'/>
                                </div>

                                <div style ={{position: 'relative', width: '100%' }}>

                                        <input 
                                            name='telegram'
                                            disabled
                                            value={values.telegram}
                                            className={styles.field} 
                                            placeholder='Телеграм *'
                                        />

                                </div>
                            </div>

                            <div className={styles.fieldWrapper}>
                                <p className={styles.formDescription}>Напиши немного слов о себе любимом :)</p>
                            </div>

                            <div className={styles.fieldWrapper}>
                                <Field as='textarea'
                                    name='description'
                                    style={{height: '100%', maxHeight: '150px', minHeight: '150px'}}
                                    placeholder='Нам очень интересно узнать о тебе!'
                                    className={styles.field}
                                >
                                    {values.description}
                                </Field>
                            </div>

                            <Button classes={{root:styles.btnSucces}} disabled={!dirty} type='submit'>
                                {dirty ? 'Сохранить' : 'Измените данные'}
                            </Button>
                        </Form>
                    )}
                </Formik>

                <Formik
                    initialValues={initPass}
                    validateOnChange={false}
                    validationSchema={validationPass}
                    onSubmit={ async (values, api) => {
                        const result = await changeHandler(values);
                        if(result.ok) setMessage(true);
                        api.setSubmitting(false);
                    }}
                >
                    {({errors, dirty, touched}) => (
                        <Form className={styles.form}>
                            <p className={styles.formDescription}>Вы можете изменить пароль</p>

                                <div className={styles.fieldWrapper}>

                                    <div style ={{position: 'relative', width: '100%', marginRight: '10px'}}>
                                        <Field className={`${styles.field} ${errors.password ? styles.fieldError : null}`} name='password' type='password' placeholder='Новый пароль *'/>
                                        {errors.password && touched.password ? <div className={styles.textError}>{errors?.password}</div> : null}
                                    </div>

                                    <div style ={{position: 'relative', width: '100%', marginRight: '10px'}}>
                                        <Field className={`${styles.field} ${errors.repeatedPassword ? styles.fieldError : null}`} name='repeatedPassword' type='password' placeholder='Повторите пароль *'/>
                                        {errors.repeatedPassword && touched.repeatedPassword ? <div className={styles.textError}>{errors?.repeatedPassword}</div> : null}
                                    </div>

                                </div>

                            <Button classes={{root:styles.btnSucces}} disabled={!dirty} type='submit'>
                                {dirty ? 'Сохранить' : 'Измените данные'}
                            </Button>
                        </Form>
                    )}
                </Formik>


                {globalState?.userData?.telegram.length ? null :
                 <div className={styles.form}>
                    <p className={styles.formDescription}>Вы можете привязать свой телеграм аккаунт, чтобы быть в курсе всех новостей!<br/> Скорее подпишись, это же самый крутой Хакатон в мире! :)</p>
                        <div className={styles.codeWrapper}>
                            <Button 
                                classes={{root:styles.btnCode}}
                                onClick={getTgCode}
                                disabled={code}

                            >
                                {code ? 'Ваш код' : 'Получить код'}
                            </Button>

                            <p className={styles.code}>{code}</p>
                        </div>

                        {code ? <div className={styles.codeWrapper} style={{marginTop: '10px'}}>
                            <Button 
                                classes={{root:styles.btnCode}}
                                onClick={async e => {
                                    await navigator.clipboard.writeText(code);
                                    setCopy(true)
                                }}
                            >
                                {copy ? 'Готово! :)' : 'Копировать код' }
                            </Button>

                            <p className={styles.code}>Скорее копируй наш код, и переходи в наш телеграм бот <a style={{textDecoration:'none'}} href='http://t.me/webjoxhackathonbot'>@HACKATHON</a> <br/>
                             и начни получать уведомления о самом крутом Хакатоне!</p>
                        </div> : null}
                </div>}

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
                    Данные успешно изменены!
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


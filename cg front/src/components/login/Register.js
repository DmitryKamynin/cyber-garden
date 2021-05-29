import React, { useState } from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Form, Formik, Field } from 'formik';
import MaskedInput from 'react-text-mask';
import * as Yup from 'yup';

import useAuth from '../../hooks/useAuth';

import styles from '../../styles/components/login/Login.module.css';

export default function Login({control}) {
    const {  registerHandler } = useAuth();
    const [visible, setVisible] = useState(false);

    const [message, setMessage] = useState(null);
    const [resultRegister, setResultRegister] = useState(null);

    const phoneRegExp = /^(\+7|[78])(\s?|\-?)(\(\d{3}\)|\d{3})(\-?|\s?)\d{3}(\-?|\s?)\d{2}(\-?|\s?)\d{2}$/;
    const validationSchema = Yup.object().shape( { 
        username: Yup.string().matches(phoneRegExp, 'Некорректный номер телефона').required('Номер телефона обязателен'),
        password: Yup.string().min(4, "Пароль должен состоять минимум из 4 символов").required('Пароль обязателен'),
        repeatedPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Пароли не совпадают!').required('Подтвердите пароль'),
    } );

    const initValues = {
        username: '',
        password: '',
        repeatedPassword: '',
    }

    const { isRegister, setRegister, setLogin } = control;

    return (
        <>
            <Dialog 
                open={isRegister}
                onClose={() => setRegister(false)}
            >
                <Formik
                    initialValues={initValues}
                    validationSchema={validationSchema}
                    validateOnChange={false}
                    validateOnBlur={false}
                    onSubmit={ async ( values, api ) => {
                            const { ok, data } = await registerHandler(values);
                            api.setSubmitting(false);

                            setResultRegister(true);
                            if(ok) setRegister(false);
                            if(!ok){ 
                                setMessage(data.username || data.password)
                            };
                        }
                    }
                >
                    {({errors, touched}) => (
                    
                    <Form>
                       
                            <DialogTitle
                                classes={{
                                    root: styles.dialogContentBg,
                                }}
                            >
                                <Button
                                    onClick={() => {
                                        setLogin(true);
                                        setRegister(false);
                                    }}
                                    classes={{
                                        root: styles.innactivBtn,
                                    }}>
                                    Войти
                                </Button>
                                <Button
                                    classes={{
                                        root: styles.btn,
                                    }}>
                                    Регистрация
                                </Button>
                            </DialogTitle> 
                            <DialogContent
                                classes={{
                                    root: `${styles.dialogContentBg} ${styles.dialogContentContent}`,
                                }}
                            >   
                                <h2 className={styles.title}>Для регистрации укажите необходимые данные</h2>
                                <label htmlFor='username'>Номер телефона</label>
    
                                <div style ={{position: 'relative'}}>
                                    <Field
                                        name='username'
                                        render={
                                            ({field}) => <MaskedInput
                                                {...field}
                                                className={`${styles.field} ${errors.username ? styles.fieldError : null}`} 
                                                mask={['+', '7', '(', /\d/, /\d/, /\d/,')', /\d/, /\d/, /\d/, '-', /\d/, /\d/,'-', /\d/, /\d/,] }
                                                />
                                        }
                                    />
    
                                    {errors.username && touched.username ? <div className={styles.textError}>{errors?.username}</div> : null}
                                </div>
    
                                <label htmlFor='password'>Создайте пароль</label>
    
                                <div style ={{position: 'relative'}}>
                                    <Field type={visible ? 'text' : 'password'} className={`${styles.field} ${errors.password ? styles.fieldError : null}`} name='password'/>
    
                                    <VisibilityIcon onMouseDown={() => setVisible(true)} onMouseUp={() => setVisible(false)} style={{position:'absolute', top: '7px', right:'15px', cursor:'pointer'}}/>
    
                                    {errors.password && touched.password ? <div className={styles.textError}>{errors?.password}</div> : null}
                                </div>
                                
                                <label htmlFor='repeatedPassword'>Повторите пароль</label>
    
                                <div style ={{position: 'relative'}}>
                                    <Field type={visible ? 'text' : 'password'} className={`${styles.field} ${errors.repeatedPassword ? styles.fieldError : null}`} name='repeatedPassword'/>
    
                                    {errors.repeatedPassword && touched.repeatedPassword ? <div className={styles.textError}>{errors?.repeatedPassword}</div> : null}
                                </div>
    
                            </DialogContent>
                            <DialogActions  
                                classes={{
                                    root: styles.dialogContentBg,
                                }}
                            >
                                <Button 
                                    classes={{root: styles.btnSucces}}
                                    type='submit'>
                                    Далее
                                </Button>
                                <Button type='button' onClick={() => setRegister(false)}>
                                    Отмена
                                </Button>
                            </DialogActions>
                    </Form>
                    )}
                </Formik>
            </Dialog>

            <Dialog
                open={resultRegister}
                onClose={() => {
                    setResultRegister(false);
                    setMessage(null);
                }}
            >
                <DialogTitle 
                    classes={{
                        root: styles.dialogContentBg,
                    }}
                >
                    {message?.map(item => <>{item}<br/></>) || 'Успешная регистрация!'}
                </DialogTitle>

                <DialogActions 
                    classes={{
                        root: styles.dialogContentBg,
                    }}
                >

                    {message ? null :
                    <Button 
                        classes={{root: styles.btnSucces}}
                        type='button' 
                        onClick={() => {
                        setResultRegister(false);
                        setLogin(true);
                    }}>
                        Войти
                    </Button>}

                    <Button type='button' onClick={() => {
                        setResultRegister(false);
                        setMessage(null);
                    }}>
                        Закрыть окно
                    </Button>

                </DialogActions>
            </Dialog>
        </>
    )
}

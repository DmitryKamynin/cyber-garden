import React, { useState } from 'react';
import { Redirect } from 'react-router';
import MaskedInput from 'react-text-mask';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Form, Formik, Field } from 'formik';
import * as Yup from 'yup';

import useAuth from '../../hooks/useAuth';

import styles from '../../styles/components/login/Login.module.css';

export default function Login({control}) {
    const [visible, setVisible] = useState(false);
    const { loginHandler } = useAuth();

    const [message, setMessage] = useState(null);
    const [resultLogin, setResultLogin] = useState(null);

    const phoneRegExp = /^(\+7|[78])(\s?|\-?)(\(\d{3}\)|\d{3})(\-?|\s?)\d{3}(\-?|\s?)\d{2}(\-?|\s?)\d{2}$/;
    const validationSchema = Yup.object().shape( { 
        username: Yup.string().matches(phoneRegExp, 'Некорректный номер телефона').required('Номер телефона обязателен'),
    } );

    const initValues = {
        username: '',
        password: '',
    }

    const {isLogin, setLogin} = control;
    if(resultLogin) return <Redirect to='/UserAccount'/>
    return (
        <>
            <Dialog 
                open={isLogin}
                onClose={() => setLogin(false)}
            >
                <Formik
                    initialValues={initValues}
                    validateOnChange={false}
                    validationSchema={validationSchema}
                    onSubmit={ async ( values, api ) => {
                            const { data, ok } = await loginHandler(values);
                            
                            if(ok) {
                                api.setSubmitting(false);
                                setResultLogin(true);
                            }
                            else{
                                setMessage(data.username || data.password || data.detail);
                                api.setSubmitting(false);
                            }
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
                                Войти на самый крутой Хакатон
                            </DialogTitle> 
                            <DialogContent
                                classes={{
                                    root: `${styles.dialogContentBg} ${styles.dialogContentContent}`,
                                }}
                            >   
                                <label htmlFor='phone'>Номер телефона</label>
    
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
    
                                <label htmlFor='password'>Введите пароль</label>
    
                                <div style ={{position: 'relative'}}>
                                    <Field type={visible ? 'text' : 'password'} className={`${styles.field} ${errors.password ? styles.fieldError : null}`} name='password'/>
    
                                    <VisibilityIcon 
                                        onMouseDown={() => setVisible(true)} 
                                        onMouseUp={() => setVisible(false)} 
                                        style={{position:'absolute', top: '17px', right:'15px', cursor:'pointer'}}
                                    />
                                </div>
    
                            </DialogContent>
                            <DialogActions  
                                classes={{
                                    root: styles.dialogContentBg,
                                }}
                            >
                                <Button type='submit'>
                                    Войти
                                </Button>
                                <Button  onClick={() => setLogin(false)}>
                                    Закрыть окно
                                </Button>
                            </DialogActions>
                    </Form>
                    )}
                </Formik>
            </Dialog>

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
                    {message}
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

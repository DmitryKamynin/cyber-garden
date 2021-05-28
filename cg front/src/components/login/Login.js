import React, { useState } from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Form, Formik, Field } from 'formik';
import * as Yup from 'yup';

import styles from '../../styles/components/login/Login.module.css';
import MaskedInput from 'react-text-mask';



export default function Login({control}) {

    const [visible, setVisible] = useState(false);


    const phoneRegExp = /^(\+7|[78])(\s?|\-?)(\(\d{3}\)|\d{3})(\-?|\s?)\d{3}(\-?|\s?)\d{2}(\-?|\s?)\d{2}$/;
    const validationSchema = Yup.object().shape( { 
        phone: Yup.string().matches(phoneRegExp, 'Некорректный номер телефона').required('Номер телефона обязателен'),
    } );

    const initValues = {
        phone: '',
        password: '',
    }

    const {isLogin, setLogin} = control;
    return (
        <Dialog 
            open={isLogin}
            onClose={() => setLogin(false)}
        >
            <Formik
                initialValues={initValues}
                validateOnChange={false}
                validationSchema={validationSchema}
                onSubmit={ async ( values, api ) => {
                        console.log(values);
                        api.setSubmitting(false);

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
                                    name='phone'
                                    render={
                                        ({field}) => <MaskedInput
                                            {...field}
                                            className={`${styles.field} ${errors.phone ? styles.fieldError : null}`} 
                                            mask={['+', '7', '(', /\d/, /\d/, /\d/,')', /\d/, /\d/, /\d/, '-', /\d/, /\d/,'-', /\d/, /\d/,] }
                                            />
                                    }
                                />

                                {errors.phone && touched.phone ? <div className={styles.textError}>{errors?.phone}</div> : null}
                            </div>

                            <label htmlFor='password'>Введите пароль</label>

                            <div style ={{position: 'relative'}}>
                                <Field type={visible ? 'text' : 'password'} className={`${styles.field} ${errors.password ? styles.fieldError : null}`} name='password'/>

                                <VisibilityIcon 
                                    onMouseDown={() => setVisible(true)} 
                                    onMouseUp={() => setVisible(false)} 
                                    style={{position:'absolute', top: '17px', right:'0px', cursor:'pointer'}}
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
    )
}

import React, { useContext, useState, useEffect } from 'react';
import { MenuItem, Select } from '@material-ui/core';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slider, Table, TableBody, TableCell, TableHead, TableRow, Tooltip } from '@material-ui/core';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MoodBadIcon from '@material-ui/icons/MoodBad';
import InfoIcon from '@material-ui/icons/Info';

import useSession from 'hooks/useSession';

import {GlobalContext} from 'state/context/globalStateContext';

import Tamplate from '../components/Tamplate'

import styles from 'styles/pages/Mentors.module.css';


const MentorComment = ({period}) => (
    <>
        {period?.comment_mentor?.length ? <div className={styles.teamTitle}>Комментарий: {period.comment_mentor}</div> : null}
        {period?.mentor_assessment?.length ?<div className={styles.teamDescription}>Оценка: {period.mentor_assessment}/100</div> : null}
    </>
)

export default function Mentors() {
    const { globalState, dispatch } = useContext(GlobalContext);

    const { handleRequestPeriod } = useSession();

    const { sessions, mentors, userData } = globalState;

    const [row, setRow] = useState(null);

    const [mentor, setMentor] = useState(null);
    const handleChange = (event) => {
        setMentor(event.target.value);
    };

    const [comment, setComment] = useState(false);
    const [thanks, setThanks] = useState(false);

    const [valueComment, setValueComment] = useState('');
    const handleChangeComment = (event) => {
        setValueComment(event.target.value);
    };

    

    const mentorSession = [...sessions].filter(session => mentor === session.id_mentor);

    return (
        <>
            <Tamplate>
                <div className={styles.wrapper}>
                    <h2 className={styles.title}>Помощь ментора</h2>
                    <p className={styles.description}>Вы заблудились и не можете найти выход?<br/> Мы вам поможем, для начала выберите вашего ЛЮБИМОГО ментора для вашего вопроса! :{')'}</p>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={mentor}
                        onChange={handleChange}
                        style={{width:'250px', marginBottom:'25px'}}
                    >
                        {mentors.map(item => (
                            <MenuItem value={item.id}>{item.first_name} {item.last_name}</MenuItem>
                        ))}
                    </Select>


                    {mentorSession.length ? mentorSession.map( session => (
                       <div key={session.id}>
                        <h3 className={styles.sessionTitle}>{session.title}</h3>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Период №</TableCell>
                                    <TableCell>Статус</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {session.periods.map( (period, index) => {
                                    return (

                                    <TableRow
                                        key={period.id_team_id}
                                        classes={{
                                            root: `${period.free_status ? null : !period.success_status ?  styles.taken : styles.reservation}`,
                                            selected: styles.selectedRow,   
                                        }} 
                                        selected={period.id === row?.period} 
                                        hover 
                                        onClick={() => setRow({period: period.id, session:session.id})}
                                    >
                                        {period.free_status ? (
                                            <>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>Свободно</TableCell>
                                                <TableCell>
                                                    <Button
                                                        disabled={!(period.id === row?.period)}
                                                        classes={{root: styles.btnSucces,}}
                                                        onClick={() => setComment(true)}
                                                    >
                                                        Отправить заявку на период
                                                    </Button>
                                                </TableCell>
                                            </>
                                        ) : !period.success_status ? (
                                            <>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>Забронировано</TableCell>
                                                <TableCell></TableCell>

                                            </>
                                        ) : 
                                            <>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>Занято</TableCell>
                                                <TableCell></TableCell>
                                        </>}
                                    </TableRow>

                                )} ) }
                            </TableBody>
                        </Table>
                        <hr/>
                       </div>
                    ) ) : <div>У данного ментора пока не назначены сессии, может вам сможет помочь другой ментор?)</div>}
                    
                </div>
            </Tamplate>

            <Dialog
                fullWidth
                open={comment}
                onClose={() =>{
                    setComment(false)
                    setValueComment('')
                }}
            >
                <DialogTitle>
                    Отправить заявку.
                </DialogTitle>

                <DialogContent>
                                        
                    <div className={styles.sliderWrapper}>
                        <input 
                            onChange={handleChangeComment}
                            value={valueComment}
                            className={styles.field} 
                            placeholder='Важное мнение *'
                        />
                    </div>
                    <p className={styles.question}>
                        Оставьте краткий комментарий ментору.
                    </p>

                </DialogContent>
                
                <DialogActions>
                    <Button
                        classes={{root: styles.btnSucces,}}
                        onClick={async () => {
                            await handleRequestPeriod( row, valueComment, userData );
                            setComment(false);
                            setThanks(true);
                        }}
                    >
                        Отправить
                    </Button>
                    <Button
                        onClick={() =>{
                            setComment(false)
                            setValueComment('')
                        }}
                    >
                        Отмена
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                fullWidth
                open={thanks}
                onClose={() =>{
                    setThanks(false)
                }}
            >
                <DialogTitle>
                    Спасибо за оценку!
                </DialogTitle>

            </Dialog>
        </>
    )
}


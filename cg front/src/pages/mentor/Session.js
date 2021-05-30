import React, { useContext, useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slider, Table, TableBody, TableCell, TableHead, TableRow, Tooltip } from '@material-ui/core';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MoodBadIcon from '@material-ui/icons/MoodBad';
import InfoIcon from '@material-ui/icons/Info';

import useSession from 'hooks/useSession';

import {GlobalContext} from 'state/context/globalStateContext';

import Tamplate from 'components/Tamplate'

import styles from 'styles/pages/Session.module.css';

const MentorComment = ({period}) => (
    <>
        {period?.comment_mentor?.length ? <div className={styles.teamTitle}>Комментарий: {period.comment_mentor}</div> : null}
        {period?.mentor_assessment?.length ?<div className={styles.teamDescription}>Оценка: {period.mentor_assessment}/100</div> : null}
    </>
)

export default function Session() {
    const { globalState } = useContext(GlobalContext);

    const { handleAccess, handleDenided, handleMentorComment } = useSession();

    const [row, setRow] = useState(null);

    const [comment, setComment] = useState(false);

    const [thanks, setThanks] = useState(false);

    const { sessions, userData, teams } = globalState;

    const [valueComment, setValueComment] = useState('');
    const [valueSlider, setValueSlider] = useState(50);

    const handleChangeComment = (event) => {
        setValueComment(event.target.value);
    };

    const handleChangeSlider = (event, newValue) => {
        setValueSlider(newValue);
    };

    const mySession = [...sessions].filter(session => session.id_mentor === userData.id);
    // console.log(globalState);
    return (
        <>
            <Tamplate>
                <div className={styles.wrapper}>
                    <h2 className={styles.title}>Привет, {userData?.first_name}</h2>
                    <p className={styles.yourSchedule}>Ваше расписание сессий</p>
                    
                    {mySession.length ? mySession.map( session => (
                       <div key={session.id}>
                        <h3 className={styles.sessionTitle}>{session.title}</h3>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Период №</TableCell>
                                    <TableCell>Команда</TableCell>
                                    <TableCell align='center'>Комментарий команды</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {session.periods.map( (period, index) => {
                                    
                                    const team = teams.find(team => team.id === period.id_team_id || period.id_team || period.team_id);
                                    return (

                                    <TableRow
                                        key={period.id_team_id}
                                        classes={{
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
                                                <TableCell></TableCell>
                                                <TableCell></TableCell>
                                                <TableCell></TableCell>
                                            </>
                                        ) : !period.success_status ? (
                                            <>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{team?.title}</TableCell>
                                                <TableCell align='center'>
                                                    {period.comment_team.length ? 
                                                    <Tooltip classes={{tooltip: styles.tooltipRoot,}} title={period.comment_team}>
                                                        <InfoIcon/>
                                                    </Tooltip> : 'Комментария нет'
                                                    }
                                                </TableCell>
                                                <TableCell align='right'>
                                                    <Button
                                                        disabled={!(period.id === row?.period)}
                                                        classes={{root: styles.btnSucces,}}
                                                        onClick={() => handleAccess(row)}
                                                    >
                                                        Подтвердить
                                                    </Button>
                                                </TableCell>
                                                <TableCell align='left'>
                                                    <Button
                                                        disabled={!(period.id === row?.period)}
                                                        classes={{root: styles.btnDenided,}}
                                                        onClick={() => handleDenided(row)}
                                                    >
                                                            Отклонить
                                                    </Button>
                                                </TableCell>
                                            </>
                                        ) : 
                                            <>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{team?.title}</TableCell>
                                                <TableCell align='center'>
                                                        {period.comment_team.length ? 
                                                            <Tooltip classes={{tooltip: styles.tooltipRoot,}} title={period.comment_team}>
                                                                <InfoIcon/>
                                                            </Tooltip> : 'Комментария нет'
                                                        }
                                                </TableCell>
                                                <TableCell align='center'>
                                                        {period?.comment_mentor?.length || period?.mentor_assessment?.length ? 
                                                            <Tooltip classes={{tooltip: styles.tooltipRoot,}} title={<MentorComment period={period}/>}>
                                                                <InfoIcon/>
                                                            </Tooltip> : 'Комментария нет'
                                                        }
                                                </TableCell>
                                                <TableCell>

                                                    <Button
                                                        classes={{root: styles.btnSucces,}}
                                                        onClick={() => setComment(true)}
                                                    >
                                                        Оценить
                                                    </Button>

                                                </TableCell>
                                        </>}
                                    </TableRow>

                                )} ) }
                            </TableBody>
                        </Table>
                        <hr/>
                       </div>
                    ) ) : 'Ваши сессии пусты, администратор скоро их заполнит!'}
                    
                </div>
            </Tamplate>


            <Dialog
                fullWidth
                open={comment}
                onClose={() =>{
                    setComment(false)
                    setValueComment('')
                    setValueSlider(50) 
                }}
            >
                <DialogTitle>
                    Оцените команду!
                </DialogTitle>

                <DialogContent>
                    
                    <div className={styles.sliderWrapper}>
                        <MoodBadIcon style={{marginRight:'5px'}}/>
                        <Slider
                            value={valueSlider}
                            min={0}
                            step={1}
                            max={100}
                            onChange={handleChangeSlider}
                            valueLabelDisplay="auto"
                            aria-labelledby="non-linear-slider"
                        />
                        <InsertEmoticonIcon style={{marginLeft:'5px'}}/>
                    </div>
                    <p className={styles.question}>
                        Насколько вы впечатлены? 
                    </p>
                    
                    <div className={styles.sliderWrapper}>
                        <input 
                            onChange={handleChangeComment}
                            value={valueComment}
                            className={styles.field} 
                            placeholder='Важное мнение *'
                        />
                    </div>
                    <p className={styles.question}>
                        Оставите Комментарий? :)
                    </p>

                </DialogContent>
                
                <DialogActions>
                    <Button
                        classes={{root: styles.btnSucces,}}
                        onClick={async () => {
                            await handleMentorComment( row, valueSlider, valueComment  );
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
                            setValueSlider(50)
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


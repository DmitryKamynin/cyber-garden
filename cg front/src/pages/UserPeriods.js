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

export default function UserPeriods() {
    const { globalState } = useContext(GlobalContext);

    const { sessions, userData } = globalState;

    const getUsersSessions = sessions.filter(session => session.periods.find(period => period.id_team === userData.team.id));

    return (
        <>
            <Tamplate>
                <div className={styles.wrapper}>
                    <h2 className={styles.title}>История сессий:</h2>
                    <p className={styles.description}>Вы должно быть хотите узнать, что думает<br/> о вас ментор, или напомнить себе, его ВЕЛИКИЙ совет? Вы по адресу...)</p>


                    {getUsersSessions.length ? getUsersSessions.map( session => (
                       <div key={session.id}>
                        <h3 className={styles.sessionTitle}>{session.title}</h3>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Период №</TableCell>
                                    <TableCell>Комментарий от ментора</TableCell>
                                    <TableCell>Ваш комментарий</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {session.periods.filter(period => period.id_team_id || period.id_team || period.team_id === userData.team.id).map( (period, index) => {
                                    return (

                                    <TableRow
                                        key={period.id_team_id}
                                        hover 
                                    >
                                        <TableCell>{period.id}</TableCell>
                                        <TableCell>
                                            {period?.comment_mentor?.length || period?.mentor_assessment?.length ? 
                                                <Tooltip classes={{tooltip: styles.tooltipRoot,}} title={<MentorComment period={period}/>}>
                                                    <InfoIcon/>
                                                </Tooltip> : 'Комментария нет'
                                            }
                                        </TableCell>
                                        <TableCell>
                                            {period.comment_team.length ? 
                                                <Tooltip classes={{tooltip: styles.tooltipRoot,}} title={period.comment_team}>
                                                    <InfoIcon/>
                                                </Tooltip> : 'Комментария нет'
                                            }
                                        </TableCell>
                                    </TableRow>

                                )} ) }
                            </TableBody>
                        </Table>
                        <hr/>
                       </div>
                    ) ) : <div>Вы пока не участвовали не в одной сессии, перейдите во вкладку "Менторы",<br/> и забронируйте какой-нибудь период! Смелее!</div>}
                    
                </div>
            </Tamplate>

    </>
    )
}


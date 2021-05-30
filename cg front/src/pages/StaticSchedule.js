import React, { useContext, useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

import {GlobalContext} from '../state/context/globalStateContext';

import Tamplate from '../components/Tamplate'

import styles from '../styles/pages/Schedule.module.css';

import { sortSchedule } from '../utils';

const GetDate = ({date}) => {
    if(date){
        const time = new Date(date);
        const month =   (time.getMonth() + 1) < 10 ? `0${time.getMonth() + 1}` : `${time.getMonth() + 1}`;
        const day =     time.getDate();
        const hour =    time.getHours() < 10 ? `0${time.getHours()}` : `${time.getHours()}`;
        const minutes = time.getMinutes() < 10 ? `0${time.getMinutes()}` : `${time.getMinutes()}`;
        return `${day}:${month} ${hour}:${minutes}`
    }
    return null;
}


export default function Schedule() {
    const { globalState } = useContext(GlobalContext);

    const { schedule } = globalState;
    let sortedSchedule = [...schedule].sort(sortSchedule);

    return (
        <>
            <Tamplate>
                <div className={styles.wrapper}>
                    <div className={styles.title}>Расписание событий самого крутого Хакатона</div>

                    <div>

                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        Дата:
                                    </TableCell>
                                    <TableCell>
                                        Событие:
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sortedSchedule.map(( item, index, arr ) => (
                                    <>
                                        {new Date(item.date_time).getDate() < new Date(arr[index + 1]?.date_time).getDate() ?
                                        <>
                                            <TableRow>
                                                <TableCell>
                                                    <GetDate date={item.date_time}/>
                                                </TableCell>
                                                <TableCell>
                                                    {item.title}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    
                                                </TableCell>
                                                <TableCell>
                                                   
                                                </TableCell>
                                            </TableRow>
                                        </>
                                        :
                                        <TableRow>
                                            <TableCell>
                                                <GetDate date={item.date_time}/>
                                            </TableCell>
                                            <TableCell>
                                                {item.title}
                                            </TableCell>
                                        </TableRow>}
                                    </>
                                ) )}
                            </TableBody>
                        </Table>                

                    </div>

                </div>
            </Tamplate>
        </>
    )
}


import React, { useContext, useState } from 'react';

import {GlobalContext} from 'state/context/globalStateContext';

import {useHttp} from 'hooks/useHttp';

import Tamplate from 'components/Tamplate'

import styles from 'styles/pages/Session.module.css';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

export default function Session() {
    const { request } = useHttp();
    const { globalState, dispatch } = useContext(GlobalContext);

    const [row, setRow] = useState(null);

    const { userData } = globalState;
    return (
        <>
            <Tamplate>
                <div className={styles.wrapper}>
                    <h2 className={styles.title}>Привет, {userData?.first_name}</h2>
                    <p className={styles.yourSchedule}>Ваше расписание сессий</p>

                    <h3 className={styles.title}></h3>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Период</TableCell>
                                <TableCell>Команда</TableCell>
                                <TableCell>Комментарий</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow classes={{
                                selected: styles.selectedRow,
                            }} selected={1 === row} hover onClick={() => setRow(1)}>
                                <TableCell>13:00-13:10</TableCell>
                                <TableCell>webjox</TableCell>
                                <TableCell>Хотим задать вопрос!</TableCell>
                            </TableRow>

                            <TableRow selected={2 === row} hover onClick={() => setRow(2)}>
                                <TableCell>13:10-13:20</TableCell>
                                <TableCell>Some Team</TableCell>
                                <TableCell>Хотим задать вопрос!</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </Tamplate>
        </>
    )
}


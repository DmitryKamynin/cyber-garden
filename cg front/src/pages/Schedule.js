import React, { useContext, useState } from 'react';

import {GlobalContext} from '../state/context/globalStateContext';

import {useHttp} from '../hooks/useHttp';

import Tamplate from '../components/Tamplate'

import styles from '../styles/pages/Schedule.module.css';

import { sortSchedule, getStartEndSchedule } from '../utils';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

const GetDate = ({date}) => {
    console.log(date)
    if(date){
        const time = new Date(date);
        const month =   (time.getMonth() + 1) < 10 ? `0${time.getMonth() + 1}` : `${time.getMonth() + 1}`;
        const day =     time.getDate();
        const hour =    time.getHours() < 10 ? `0${time.getHours()}` : `${time.getHours()}`;
        const minutes = time.getMinutes() < 10 ? `0${time.getMinutes()}` : `${time.getMinutes()}`;
        return `${hour}:${minutes} ${month}.${day}`
    }
    return null;
}


const TimeScale = ({sortedSchedule, currentTime}) => {

    const scale = sortedSchedule.slice(currentTime, currentTime + 7);
    console.log(scale, currentTime);


    return (
        <>
            <div className={styles.theSmallest}>
                <GetDate date={scale[0]?.date_time}/> {scale[0]?.title}
            </div>

            <div className={styles.isSmall}>
                <GetDate date={scale[1]?.date_time}/> {scale[1]?.title}
            </div>

            <div className={styles.isSmaller}>
                <GetDate date={scale[2]?.date_time}/> {scale[2]?.title}
            </div>

            <div className={styles.isCurrent}>
                <GetDate date={scale[3]?.date_time}/> {scale[3]?.title}
            </div>

            <div className={styles.isSmaller}>
                <GetDate date={scale[4]?.date_time}/> {scale[4]?.title}
            </div>

            <div className={styles.isSmall}>
                <GetDate date={scale[5]?.date_time}/> {scale[5]?.title}
            </div>

            <div className={styles.theSmallest}>
                <GetDate date={scale[6]?.date_time}/> {scale[6]?.title}
            </div>
        </>
    );
};

export default function Schedule() {
    const { request } = useHttp();
    const { globalState, dispatch } = useContext(GlobalContext);

    const [currentTime, setCurrentTime] = useState(0);

    const { schedule } = globalState;

    const sortedSchedule = [...schedule].sort(sortSchedule);

    const handleWhell = (e) => {
        console.log(e)
        if(currentTime === 0 && e.deltaY < 0) return null;
        if(currentTime === sortedSchedule.length && e.deltaY > 0) return null;
        else{
            if(e.deltaY > 0) setCurrentTime(currentTime + 1);
            else setCurrentTime(currentTime + -1);
        }
    }
    

    return (
        <>
            <Tamplate>
                <div  className={styles.wrapper}>
                    <div className={styles.title}>Расписание событий самого крутого Хакатона</div>

                    <div className={styles.timeWrapper}>
                        
                        <div className={styles.target}>
                            {new Date(sortedSchedule[currentTime + 4]?.date_time) > new Date() ? 'Будет' : "Было"}
                        </div>

                        <div onWheel={handleWhell} className={styles.timeScale}>
                            <TimeScale sortedSchedule={sortedSchedule} currentTime={currentTime}/>
                        </div>

                    </div>

                </div>
            </Tamplate>
        </>
    )
}


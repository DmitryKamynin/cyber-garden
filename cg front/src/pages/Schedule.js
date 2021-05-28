import React, { useContext, useState, useEffect } from 'react';

import {GlobalContext} from '../state/context/globalStateContext';

import {useHttp} from '../hooks/useHttp';

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
        return `${hour}:${minutes} ${month}.${day}`
    }
    return null;
}


const TimeScale = ({sortedSchedule, currentTime}) => {

    const scale = sortedSchedule.slice(currentTime, currentTime + 7);

    const getStyle = (index) => {
        if( currentTime === index ) return styles.isCurrent;
        if( currentTime - index === 3) return styles.theSmallest;
        if( currentTime - index === 2) return styles.isSmall;
        if( currentTime - index === 1) return styles.isSmaller;
        else{
            if( index - currentTime === 3) return styles.theSmallest;
            if( index - currentTime === 2) return styles.isSmall;
            if( index - currentTime === 1) return styles.isSmaller;
            else return styles.empty;
        }
    }

    return (
        <>
            {sortedSchedule.map(( item, index) => (
                <div key={item.id} className={getStyle(index)}>
                    <div style={{display:'flex', alignItems:'center'}}> 

                    { currentTime === index ? '[' : ''}
                    
                        <div>
                            <GetDate date={item?.date_time}/>
                        </div>
                        
                        <div style={{marginLeft: '20px'}}> 
                            {item?.title}
                        </div>
                    
                    { currentTime === index ? ']' : ''}
                    </div>
                </div>
            ))} 
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
        if(currentTime === 0 && e.deltaY < 0) return null;
        if(currentTime === sortedSchedule.length - 1 && e.deltaY > 0) return null;
        else{
            if(e.deltaY > 0) setCurrentTime(currentTime + 1);
            else setCurrentTime(currentTime + -1);
        }
    };

    // const handleScroll = (e) => {
    //     console.log(e)
    // };

    // useEffect(() => {
    //     window.addEventListener( 'scroll', handleScroll);
    //     return () => window.removeEventListener( 'scroll', handleScroll);
    // },[])

    const timeDiffrent = new Date () -  new Date(sortedSchedule[currentTime]?.date_time);

    return (
        <>
            <Tamplate>
                <div onWheel={handleWhell} className={styles.wrapper}>
                    <div className={styles.title}>Расписание событий самого крутого Хакатона</div>

                    <div className={styles.timeWrapper}>
                        
                        <div className={styles.target}>
                            {timeDiffrent < 3600000 && timeDiffrent > 0 ? 'Сейчас идёт' : 
                            new Date(sortedSchedule[currentTime]?.date_time) > new Date() ? 'Будет' : "Было"}
                        </div>

                        <div className={styles.timeScale}>
                            <TimeScale sortedSchedule={sortedSchedule} currentTime={currentTime}/>
                        </div>

                    </div>

                </div>
            </Tamplate>
        </>
    )
}


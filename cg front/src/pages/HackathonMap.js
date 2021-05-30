import React, { useContext } from 'react';

import {GlobalContext} from '../state/context/globalStateContext';

import Tamplate from '../components/Tamplate'

import styles from '../styles/pages/HackathonMap.module.css';
import { GridPanelWrapper } from '@material-ui/data-grid';

import { tables } from '../utils';
import { Button, Tooltip } from '@material-ui/core';

const TeamDescription = ({team}) => (
    <>
        <div className={styles.teamTitle}>{team.title}</div>
        <div className={styles.teamDescription}>{team.description}</div>
    </>
)

export default function HackathonMap() {
    const { globalState, dispatch } = useContext(GlobalContext);

    return (
        <>
            <Tamplate>
                <div className={styles.wrapper}>
                     

                     <div className={styles.map} style={{backgroundImage:`url(/map.svg)` }}>
                         
                        <div 
                            style={{backgroundImage:`url(/border.svg)`}}
                            className={styles.borderImg}
                        />
                        <div 
                            style={{backgroundImage:`url(/lest1.svg)`}}
                            className={styles.lest1}
                        />
                        <div 
                            style={{backgroundImage:`url(/lest2.svg)`}}
                            className={styles.lest2}
                        />
                        <div 
                            style={{backgroundImage:`url(/lest3.svg)`}}
                            className={styles.lest3}
                        />
                        <div 
                            style={{backgroundImage:`url(/lest3.svg)`}}
                            className={styles.lest4}
                        />
                        <div 
                            style={{backgroundImage:`url(/lest5.svg)`}}
                            className={styles.lest5}
                        />
                        


                        {tables.map(table => {
                        const team = globalState?.teams?.find(team => table.id === +team.id);
                        return (
                        <Tooltip 
                            disableHoverListener={!team} 
                            title={<TeamDescription team={team}/>}
                            classes={{
                                tooltip: styles.tooltipRoot,
                            }}
                        >
                            <div
                                style={{backgroundImage:`url(${team ? '/table.svg' : '/disableTable.svg'})`,left: `${table.y}px`, top: `${table.x}px`,}}
                                className={styles.table}
                            >
                                {table.id}
                            </div>
                        </Tooltip>
                        )} ) }
                        
                     </div>
                </div>
            </Tamplate>
        </>
    )
}


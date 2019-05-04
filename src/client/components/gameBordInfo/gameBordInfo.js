
import React from 'react';
import './styles.css';

const GameBordInfo = () => {
    return (
        <div className={'gameBordInfoWidth'}>
            <div className={'gameBordInfoValue'}>
                <span className={'textMargin'}>Max</span>
                <span className={'textMargin'}>0000</span>
            </div>
            <div className={'gameBordInfoValue'}>
                <span className={'textMargin'}>Cleans</span>
                <span className={'textMargin'}>0000</span>
            </div>
            <div className={'gameBordInfoValue'}>
                <span className={'textMargin'}>Level</span>
                <span className={'textMargin'}>0000</span>
            </div>
            <div className={'gameBordInfoValue'}>
                <span className={'textMargin'}>Next</span>
                <div>
                    <div className='rows rowsJustifyContent'>
                        <div className={`block blockBorder`} />
                        <div className={`block blockBorder`} />
                        <div className={`block blockBorder`} />
                        <div className={`block blockBorder`} />
                    </div>
                    <div className='rows rowsJustifyContent'>
                        <div className={`block blockBorder`} />
                        <div className={`block blockBorder`} />
                        <div className={`block blockBorder`} />
                        <div className={`block blockBorder`} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export {
    GameBordInfo,
};

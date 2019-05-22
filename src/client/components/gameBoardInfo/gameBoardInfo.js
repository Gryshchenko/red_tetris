
import React from 'react';
import './styles.css';

const GameBoardInfo = () => {
    return (
        <div className={'gameBoardInfoWidth'}>
            <div className={'gameBoardInfoValue'}>
                <span className={'textMargin'}>Score</span>
                <span className={'textMargin'}>0000</span>
            </div>
            <div className={'gameBoardInfoValue'}>
                <span className={'textMargin'}>Cleans</span>
                <span className={'textMargin'}>0000</span>
            </div>
            {/* <div className={'gameBoardInfoValue'}>
                <span className={'textMargin'}>Level</span>
                <span className={'textMargin'}>0000</span>
            </div> */}
            <div className={'gameBoardInfoValue'}>
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
    GameBoardInfo,
};

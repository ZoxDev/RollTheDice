// Css
import './Player.css'

// React
import { useState } from "react";
import { PropTypes } from 'prop-types';

Player.propTypes = {
    whoPlayerIs: PropTypes.number,
    currentPlayer: PropTypes.number,
    onClickNextPlayer: PropTypes.func,
    onReachFifty: PropTypes.func
};

export default function Player(props) {
    const [result, setResult] = useState(0);
    const [roundResult, setRoundResult] = useState(0);
    const [diceThrowing, setDiceThrowing] = useState(false);

    const [totalResult, setTotalResult] = useState(0);


    // Next Player system
    const nextPlayer = () => {
        setTimeout(() => {
            if (props.currentPlayer == 1) {
                props.onClickNextPlayer(2);
            } else {
                props.onClickNextPlayer(1);
            }
        }, 4000);
    };

    // Dice system
    const Dice = () => {
        setTimeout(() => {
            setResult(Math.floor(Math.random() * 6) + 1);
            setRoundResult(result + roundResult);
            setDiceThrowing(false);
        }, 3000);
    };

    // HandleCliks
    const handleClickThrowDice = () => {
        setDiceThrowing(true);
        Dice();
    };

    const handleClickNextRound = () => {
        props.onClickNextPlayer(0);
        setTotalResult(result + roundResult + totalResult);
        setResult(0);
        setRoundResult(0);
        nextPlayer();
    }

    // Loose round system
    if (result == 1) {
        props.onClickNextPlayer(0);
        setResult(0);
        setRoundResult(0);
        nextPlayer();
    }

    // Return player score
    if (totalResult >= 50) {
        props.onReachFifty(totalResult);
    }

    //Formater en composant avec prop de fonction et tout
    // Styliser et finis
    return (
        <>
            <main className="player_container">
                <h1 className='player_name'>Player {props.whoPlayerIs}</h1>
                <div className='player_stats'>
                    <h2 className='player_stat'>Now: {result}</h2>
                    <h2 className='player_stat'>Round: {roundResult}</h2>
                    <h2 className='player_stat'>Total: {totalResult}</h2>
                </div> 
                <div className='buttons'>
                    <button className='player_play' disabled={props.currentPlayer != props.whoPlayerIs || diceThrowing == true} onClick={handleClickThrowDice}>CLICK TO PLAY</button>
                    <button className='player_play' disabled={props.currentPlayer != props.whoPlayerIs || diceThrowing == true} onClick={handleClickNextRound}>NEXT ROUND</button>
                </div>
            </main>
        </>
    )
}
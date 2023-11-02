// Css
import './Player.css'

import { useState } from "react";

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

    return (
        <>
            <main className="player_container">
                <h1 className='player_name'>Player {props.whoPlayerIs}</h1>
                <div className='player_stats'>
                    <h2>Now: {result}</h2>
                    <h2>Round: {roundResult}</h2>
                    <h2>Total: {totalResult}</h2>
                </div>
                <button className='player_play' disabled={props.currentPlayer != props.whoPlayerIs || diceThrowing == true} onClick={handleClickThrowDice}>CLICK TO PLAY</button>
                <button className='player_next_round' disabled={props.currentPlayer != props.whoPlayerIs || diceThrowing == true} onClick={handleClickNextRound}>NEXT ROUND</button>
            </main>
        </>
    )
}
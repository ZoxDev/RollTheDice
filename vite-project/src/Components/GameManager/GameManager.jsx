// Css
import './GameManager.css'

// Utils
import { useState } from "react";

// Component
import Player from "../Player/Player";

export default function GameManager() {
    // Create state for context
    const [currentPlayer, setCurrentPlayer] = useState(1);

    // PlayerScore
    const [player1Score, setPlayer1Score] = useState(0);
    const [player2Score, setPlayer2Score] = useState(0);

    if (player1Score >= 50) {
        alert("Player 1 win!");
    } else if (player2Score >= 50) {
        alert("Player 2 win!");
    }

    return (
        <>
            <main className='main_container'>
                <Player currentPlayer={currentPlayer} whoPlayerIs="1" onClickNextPlayer={setCurrentPlayer} onReachFifty={setPlayer1Score} />
                <Player currentPlayer={currentPlayer} whoPlayerIs="2" onClickNextPlayer={setCurrentPlayer} onReachFifty={setPlayer2Score} />
            </main>
        </>
    )
}
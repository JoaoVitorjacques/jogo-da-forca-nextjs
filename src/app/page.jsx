"use client"

import { useState, useEffect, useCallback } from "react"
import { HangmanDrawing } from "./components/HangmanDrawing"
import { HangmanWord } from "./components/HangmanWord"
import { Keyboard } from "./components/Keyboard"
import { getRandomWord } from "./wordList.js"

export default function Home() {
  const [wordToGuess, setWordToGuess] = useState(getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState([]);

  const incorrectLetters = guessedLetters.filter(
    letter => !wordToGuess.includes(letter)
  );

  const isLoser = incorrectLetters.length >= 6;
  const isWinner = wordToGuess
    .split("")
    .every(letter => guessedLetters.includes(letter));

  const addGuessedLetter = useCallback((letter) => {
    if (guessedLetters.includes(letter) || isLoser || isWinner) return;
    setGuessedLetters(currentLetters => [...currentLetters, letter]);
  }, [guessedLetters, isWinner, isLoser]);
  
  const restartGame = () => {
    setWordToGuess(getRandomWord());
    setGuessedLetters([]);
  }

  useEffect(() => {
    const handler = (e) => {
      const key = e.key.toUpperCase();
      if (!key.match(/^[A-Z]$/)) return;
      e.preventDefault();
      addGuessedLetter(key);
    }

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    }
  }, [guessedLetters]);
  
  useEffect(() => {
    const handler = (e) => {
      const key = e.key
      if (key !== "Enter") return
      e.preventDefault()
      restartGame()
    }

    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [])

  return (
    <div style={{
      maxWidth: "800px",
      display: "flex",
      flexDirection: "column",
      gap: "2rem",
      margin: "0 auto",
      alignItems: "center",
      padding: "1rem"
    }}>
      <div style={{ fontSize: "2rem", textAlign: "center" }}>
        {isWinner && "Parabéns! - Pressione Enter para jogar novamente"}
        {isLoser && "Você Perdeu! - Pressione Enter para tentar novamente"}
      </div>
      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
      <HangmanWord reveal={isLoser} guessedLetters={guessedLetters} wordToGuess={wordToGuess} />
      <div style={{ alignSelf: "stretch" }}>
        <Keyboard
          disabled={isWinner || isLoser}
          activeLetters={guessedLetters.filter(letter => wordToGuess.includes(letter))}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
      </div>
       <button 
        onClick={restartGame}
        className="mt-4 px-6 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700"
      >
        Reiniciar Jogo
      </button>
    </div>
  )
} // Forçando a atualização para a Vercel
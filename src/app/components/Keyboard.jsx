const KEYS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function Keyboard({ activeLetters, inactiveLetters, addGuessedLetter, disabled = false }) {
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(75px, 1fr))",
      gap: ".5rem"
    }}>
      {KEYS.map(key => {
        const isActive = activeLetters.includes(key);
        const isInactive = inactiveLetters.includes(key);
        return (
          <button
            onClick={() => addGuessedLetter(key)}
            className={`
              w-full border-2 border-black text-2xl p-2 font-bold uppercase
              hover:bg-sky-400 focus:bg-sky-400
              ${isActive ? "bg-sky-500 text-white" : ""}
              ${isInactive ? "opacity-30" : ""}
            `}
            disabled={isInactive || isActive || disabled}
            key={key}
          >
            {key}
          </button>
        )
      })}
    </div>
  )
}
import { useState } from "react";

function HabitForm({ addHabit, inputRef }) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (text.trim()) {
      addHabit(text);
      setText("");
    }
  };

  return (
    <div className="habit-form">
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter your habit"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={handleSubmit}>Add</button>
    </div>
  );
}

export default HabitForm;
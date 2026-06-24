import { useState } from "react";

function HabbitForm({ addHabbit, inputRef }) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (text.trim()) {
      addHabbit(text);
      setText("");
    }
  };

  return (
    <div>
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

export default HabbitForm;
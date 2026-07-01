import { useRef, useEffect } from "react";
import HabitForm from "./HabitForm";
import Stats from "./Stats";
import "../styles/dashboard.css";

function Dashboard({ habits, dispatch }) {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const addHabit = (newHabit) => {
    dispatch({
      type: "ADD_HABIT",
      payload: newHabit,
    });
  };

  const deleteHabit = (id) => {
    dispatch({
      type: "DELETE_HABIT",
      payload: id,
    });
  };

  const completeHabit = (id) => {
    dispatch({
      type: "COMPLETE_HABIT",
      payload: id,
    });
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>

      <HabitForm addHabit={addHabit} inputRef={inputRef} />

      {habits.map((habit) => (
        <div key={habit.id} className="habit-item">
          <p>
            {habit.text} - {habit.completed ? "Completed" : "Pending"}
          </p>

          <button className="complete-btn" onClick={() => completeHabit(habit.id)}>
            Complete
          </button>

          <button className="delete-btn" onClick={() => deleteHabit(habit.id)}>
            Delete
          </button>
        </div>
      ))}

      <Stats habits={habits} />
    </div>
  );
}

export default Dashboard;
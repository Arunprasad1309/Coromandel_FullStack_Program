import { useReducer, useRef, useEffect } from "react";
import { habbitReducer } from "../reducer/habbitReducer";
import HabbitForm from "./HabbitForm";

function Dashboard() {
  const [habbits, dispatch] = useReducer(habbitReducer, []);
  const inputRef = useRef();

  // Auto focus when dashboard loads
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const addHabbit = (newHabbit) => {
    dispatch({
      type: "ADD_HABBIT",
      payload: newHabbit,
    });
  };

  const deleteHabbit = (id) => {
    dispatch({
      type: "DELETE_HABBIT",
      payload: id,
    });
  };

  const completeHabbit = (id) => {
    dispatch({
      type: "COMPLETE_HABBIT",
      payload: id,
    });
  };

  return (
    <div>
      <h2>Dashboard</h2>

      <HabbitForm addHabbit={addHabbit} inputRef={inputRef} />

      {habbits.map((habbit) => (
        <div key={habbit.id}>
          <p>
            {habbit.text} - {habbit.completed ? "Completed" : "Pending"}
          </p>

          <button onClick={() => completeHabbit(habbit.id)}>
            Complete
          </button>

          <button onClick={() => deleteHabbit(habbit.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
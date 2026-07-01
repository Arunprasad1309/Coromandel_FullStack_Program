import { useMemo } from "react";
import "../styles/stats.css";

function Stats({ habits }) {
  const stats = useMemo(() => {
    const total = habits.length;
    const completed = habits.filter(
      (habit) => habit.completed
    ).length;
    const pending = total - completed;

    return { total, completed, pending };
  }, [habits]);

 return (
  <div className="stats">
    <h3>Statistics</h3>

    <div className="stats-container">
      <div className="stat-box">
        <h4>Total Habits</h4>
        <p>{stats.total}</p>
      </div>

      <div className="stat-box">
        <h4>Completed</h4>
        <p>{stats.completed}</p>
      </div>

      <div className="stat-box">
        <h4>Pending</h4>
        <p>{stats.pending}</p>
      </div>
    </div>
  </div>
);
}

export default Stats;
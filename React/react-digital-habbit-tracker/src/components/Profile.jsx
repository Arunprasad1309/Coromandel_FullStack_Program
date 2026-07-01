import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import "../styles/profile.css";

function Profile({ habits }) {
  const { user } = useContext(UserContext);

  const completedCount = habits.filter(
    (habit) => habit.completed
  ).length;

  return (
  <div className="profile">
    <h2>Profile Page</h2>

    <div className="profile-info">
      <p><strong>Username:</strong> {user}</p>
      <p>
        <strong>Total Completed Habits:</strong> {completedCount}
      </p>
    </div>
  </div>
);
}

export default Profile;
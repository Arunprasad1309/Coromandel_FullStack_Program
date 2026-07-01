import "../styles/navbar.css";

function Navbar({ setPage, logout })
 {
    return (
        <div className="navbar">
        <button onClick={() => setPage("dashboard")}>
            Dashboard
        </button>

        <button onClick={() => setPage("profile")}>
            Profile
        </button>

        <button onClick={logout}>
            Logout
        </button>
        </div>
    );
}

export default Navbar;
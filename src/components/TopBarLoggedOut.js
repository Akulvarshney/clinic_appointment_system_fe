import React from "react";
import { useNavigate } from "react-router-dom";

const TopBarLoggedOut = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        backgroundColor: "#2980b9",
        color: "#fff",
        padding: "1rem",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>Arogi</div>
      <button onClick={() => navigate("/login")}>Login</button>
    </div>
  );
};

export default TopBarLoggedOut;

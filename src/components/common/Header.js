import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const activeStyle = { color: "#F15B2A" };

  return (
    <nav>
      <NavLink to="/" activeStyle={activeStyle} exact>
        Home
      </NavLink>
      {" | "}
      <NavLink to="/movies" activeStyle={activeStyle}>
        Movies
      </NavLink>
      {" | "}
      <NavLink to="/actors" activeStyle={activeStyle}>
        Actors
      </NavLink>
      {" | "}
      <NavLink to="/directors" activeStyle={activeStyle}>
        Directors
      </NavLink>
      {" | "}
      <NavLink to="/genres" activeStyle={activeStyle}>
        Genres
      </NavLink>
      {" | "}
      <NavLink to="/mediaHouses" activeStyle={activeStyle}>
        Media Houses
      </NavLink>
    </nav>
  );
};

export default Header;

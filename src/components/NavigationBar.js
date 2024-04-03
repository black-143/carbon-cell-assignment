import React, { useState } from "react";
import "./NavigationBar.css";
import SearchIcon from "@mui/icons-material/Search";

const NavigationBar = () => {
  const [activeItem, setActiveItem] = useState("");
  const [searchItem, setSearchItem] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  const navigationItems = [
    "Home",
    "Organization",
    "Assets",
    "Tracks",
    "History",
    "Wallets",
    "Notification",
    "Support",
    "Settings",
  ];

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  const handleItemChange = (e) => {
    const searchText = e.target.value.toLowerCase();
    setSearchItem(searchText);

    const filtered = navigationItems.filter((item) =>
      item.toLowerCase().includes(searchText)
    );
    setFilteredItems(filtered);
  };

  return (
    <div className="navigation-bar">
      <div className="logo">
        <img src="https://carboncell.io/assets/img/logo2.png" alt="Logo" />
      </div>
      <div className="search">
        <div className="search-wrapper">
          <input
            className="search-input"
            placeholder="Search"
            type="text"
            value={searchItem}
            onChange={handleItemChange}
          />
          <SearchIcon className="search-icon" />
        </div>
      </div>
      <ul className="nav-items">
        {filteredItems.length > 0
          ? filteredItems.map((item) => (
              <li
                key={item}
                className={activeItem === item ? "active" : null}
                onClick={() => handleItemClick(item)}
              >
                {item}
              </li>
            ))
          : navigationItems.map((item) => (
              <li
                key={item}
                className={activeItem === item ? "active" : null}
                onClick={() => handleItemClick(item)}
              >
                {item}
              </li>
            ))}
      </ul>
    </div>
  );
};

export default NavigationBar;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BarChart.css";
import he from "he";

const BarChart = () => {
  const [prices, setPrices] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.coindesk.com/v1/bpi/currentprice.json"
        );
        setPrices(response.data.bpi);
      } catch (error) {
        console.error("Error fetching cryptocurrency prices:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="crypto-prices-container">
      <h2 className="crypto-heading">Bitcoin Prices in Different Currencies</h2>
      <div className="price-cards-container">
        {prices &&
          Object.entries(prices).map(([currency, data]) => (
            <div className="price-card" key={currency}>
              <h3 className="currency-name">{currency}</h3>
              <p className="price">
                {he.decode(data.symbol)}
                {data.rate}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default BarChart;

import React, { useEffect, useState } from 'react';
import { fetchCryptoData } from './api/crypto';
import { CryptoData } from './types';

function App() {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const getData = async () => {
      const data = await fetchCryptoData();
      setCryptoData(data);
    };

    getData();
    const intervalId = setInterval(getData, 60000); // Fetch data every minute

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setCurrentTime(timeString);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex justify-center items-center">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl font-bold text-center mb-2 text-blue-600">Cryptocurrency Tracker</h1>
        <p className="text-center text-gray-600 mb-8">{currentTime}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cryptoData.map((coin) => (
            <div key={coin.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-2xl font-semibold text-gray-800">{coin.name}</h2>
              <p className="text-gray-600">Price: <span className="text-green-500">${coin.current_price}</span></p>
              <p className="text-gray-600">Market Cap: <span className="text-blue-500">${coin.market_cap}</span></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

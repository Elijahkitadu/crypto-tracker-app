export const fetchCryptoData = async () => {
    try {
      const response = await fetch('/.netlify/functions/fetchCryptoData');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching cryptocurrency data:', error);
      return [];
    }
  };
  
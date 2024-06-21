const fetchAdditionalQuestions = async (topic) => {
    try {
      const response = await fetch(`https://api.example.com/questions?topic=${topic}`);
      const data = await response.json();
      return data.questions;
    } catch (error) {
      console.error('Error fetching additional questions:', error);
      return [];
    }
  };
  
  export default fetchAdditionalQuestions;
  
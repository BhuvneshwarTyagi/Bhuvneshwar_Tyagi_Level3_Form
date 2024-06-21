import { toast } from "react-toastify";

const fetchAdditionalQuestions = async (topic) => {
    try {
      const response = await fetch(`https://bhuvneshwar-tyagi-level3-form.onrender.com/questions/fetch/questions?topic=${topic}`);
      const data = await response.json();
      toast.success('Questions fetched Successfully');
      return data.Question;
    } catch (error) {
      console.error('Error fetching additional questions:', error);
      toast(error);
      return [];
    }
  };
  
  export default fetchAdditionalQuestions;
  
import React, { useState } from 'react';
import useFormValidation from './useFormValidation';
import fetchAdditionalQuestions from './fetchAdditionalQuestions';

const SurveyForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    surveyTopic: '',
    favoriteProgrammingLanguage: '',
    yearsOfExperience: '',
    exerciseFrequency: '',
    dietPreference: '',
    highestQualification: '',
    fieldOfStudy: '',
    feedback: '',
    additionalQuestions: [],
  });

  const validate = (values) => {
    const errors = {};

    if (!values.fullName) errors.fullName = 'Full Name is required';
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email address is invalid';
    }
    if (!values.surveyTopic) errors.surveyTopic = 'Survey Topic is required';

    if (values.surveyTopic === 'Technology') {
      if (!values.favoriteProgrammingLanguage) {
        errors.favoriteProgrammingLanguage = 'Favorite Programming Language is required';
      }
      if (!values.yearsOfExperience || values.yearsOfExperience <= 0) {
        errors.yearsOfExperience = 'Years of Experience must be a number greater than 0';
      }
    }

    if (values.surveyTopic === 'Health') {
      if (!values.exerciseFrequency) errors.exerciseFrequency = 'Exercise Frequency is required';
      if (!values.dietPreference) errors.dietPreference = 'Diet Preference is required';
    }

    if (values.surveyTopic === 'Education') {
      if (!values.highestQualification) errors.highestQualification = 'Highest Qualification is required';
      if (!values.fieldOfStudy) errors.fieldOfStudy = 'Field of Study is required';
    }

    if (!values.feedback || values.feedback.length < 50) {
      errors.feedback = 'Feedback is required and must be at least 50 characters';
    }

    return errors;
  };

  const { errors, validateForm } = useFormValidation(formData, validate);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const additionalQuestions = await fetchAdditionalQuestions(formData.surveyTopic);
      setFormData({
        ...formData,
        additionalQuestions,
      });
      alert(JSON.stringify({ ...formData, additionalQuestions }, null, 2));
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-blue-200 overflow-y-auto pt-16">
        
      
      <form onSubmit={handleSubmit} className="bg-white h-auto px-4 py-2 rounded-lg shadow-md w-full max-w-md overflow-y-auto">
      <h1 className='mb-3 text-center'>Survey</h1>
        <div className="mb-4">
          <label className="block mb-2">Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
          {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-2">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-2">Survey Topic:</label>
          <select name="surveyTopic" value={formData.surveyTopic} onChange={handleChange} className="w-full p-2 border rounded-lg">
            <option value="">Select a topic</option>
            <option value="Technology">Technology</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
          </select>
          {errors.surveyTopic && <p className="text-red-500 text-sm">{errors.surveyTopic}</p>}
        </div>

        {formData.surveyTopic === 'Technology' && (
          <>
            <div className="mb-4">
              <label className="block mb-2">Favorite Programming Language:</label>
              <select name="favoriteProgrammingLanguage" value={formData.favoriteProgrammingLanguage} onChange={handleChange} className="w-full p-2 border rounded-lg">
                <option value="">Select a language</option>
                <option value="JavaScript">JavaScript</option>
                <option value="Python">Python</option>
                <option value="Java">Java</option>
                <option value="C#">C#</option>
              </select>
              {errors.favoriteProgrammingLanguage && <p className="text-red-500 text-sm">{errors.favoriteProgrammingLanguage}</p>}
            </div>

            <div className="mb-4">
              <label className="block mb-2">Years of Experience:</label>
              <input
                type="number"
                name="yearsOfExperience"
                value={formData.yearsOfExperience}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
              {errors.yearsOfExperience && <p className="text-red-500 text-sm">{errors.yearsOfExperience}</p>}
            </div>
          </>
        )}

        {formData.surveyTopic === 'Health' && (
          <>
            <div className="mb-4">
              <label className="block mb-2">Exercise Frequency:</label>
              <select name="exerciseFrequency" value={formData.exerciseFrequency} onChange={handleChange} className="w-full p-2 border rounded-lg">
                <option value="">Select a frequency</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Rarely">Rarely</option>
              </select>
              {errors.exerciseFrequency && <p className="text-red-500 text-sm">{errors.exerciseFrequency}</p>}
            </div>

            <div className="mb-4">
              <label className="block mb-2">Diet Preference:</label>
              <select name="dietPreference" value={formData.dietPreference} onChange={handleChange} className="w-full p-2 border rounded-lg">
                <option value="">Select a preference</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Non-Vegetarian">Non-Vegetarian</option>
              </select>
              {errors.dietPreference && <p className="text-red-500 text-sm">{errors.dietPreference}</p>}
            </div>
          </>
        )}

        {formData.surveyTopic === 'Education' && (
          <>
            <div className="mb-4">
              <label className="block mb-2">Highest Qualification:</label>
              <select name="highestQualification" value={formData.highestQualification} onChange={handleChange} className="w-full p-2 border rounded-lg">
                <option value="">Select a qualification</option>
                <option value="High School">High School</option>
                <option value="Bachelor's">Bachelor's</option>
                <option value="Master's">Master's</option>
                <option value="PhD">PhD</option>
              </select>
              {errors.highestQualification && <p className="text-red-500 text-sm">{errors.highestQualification}</p>}
            </div>

            <div className="mb-4">
              <label className="block mb-2">Field of Study:</label>
              <input
                type="text"
                name="fieldOfStudy"
                value={formData.fieldOfStudy}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
              {errors.fieldOfStudy && <p className="text-red-500 text-sm">{errors.fieldOfStudy}</p>}
            </div>
          </>
        )}

        <div className="mb-4">
          <label className="block mb-2">Feedback:</label>
          <textarea
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            rows="4"
          />
          {errors.feedback && <p className="text-red-500 text-sm">{errors.feedback}</p>}
        </div>

        {formData.additionalQuestions.length > 0 && (
          <div className="mb-4">
            <h3 className="mb-2">Additional Questions</h3>
            {formData.additionalQuestions.map((question, index) => (
              <div key={index} className="mb-4">
                <label className="block mb-2">{question.questionText}</label>
                <input
                  type="text"
                  name={`additionalQuestion${index}`}
                  value={formData[`additionalQuestion${index}`] || ''}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            ))}
          </div>
        )}

        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg">Submit</button>
      </form>
      
    </div>
  );
};

export default SurveyForm;

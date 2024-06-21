import { useState, useEffect } from 'react';

const useFormValidation = (formData, validate) => {
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors(validate(formData));
  }, [formData]);

  const validateForm = () => {
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  return { errors, validateForm };
};

export default useFormValidation;

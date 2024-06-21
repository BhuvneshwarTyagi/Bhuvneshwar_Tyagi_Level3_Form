# Advanced Survey Form Documentation

## Overview

This document provides a detailed explanation of the Advanced Survey Form built using React functional components and hooks. The form includes complex conditional fields, dynamic sections, and integration with an external API for fetching additional questions.

## Form Fields

1. **Full Name (Text)**
   - **Type**: Text
   - **Validation**: Required

2. **Email (Email)**
   - **Type**: Email
   - **Validation**: Required, must be a valid email format

3. **Survey Topic (Dropdown)**
   - **Type**: Select
   - **Options**: Technology, Health, Education

4. **Technology Section (Visible if "Technology" is selected)**
   - **Favorite Programming Language (Dropdown)**
     - **Type**: Select
     - **Options**: JavaScript, Python, Java, C#
   - **Years of Experience (Number)**
     - **Type**: Number

5. **Health Section (Visible if "Health" is selected)**
   - **Exercise Frequency (Dropdown)**
     - **Type**: Select
     - **Options**: Daily, Weekly, Monthly, Rarely
   - **Diet Preference (Dropdown)**
     - **Type**: Select
     - **Options**: Vegetarian, Vegan, Non-Vegetarian

6. **Education Section (Visible if "Education" is selected)**
   - **Highest Qualification (Dropdown)**
     - **Type**: Select
     - **Options**: High School, Bachelor's, Master's, PhD
   - **Field of Study (Text)**
     - **Type**: Text

7. **Feedback (Textarea)**
   - **Type**: Textarea
   - **Validation**: Required, must be at least 50 characters

## Conditional Logic

- **Technology Section**: Displayed if "Technology" is selected.
- **Health Section**: Displayed if "Health" is selected.
- **Education Section**: Displayed if "Education" is selected.

## Validation Logic

- **Full Name**: Must be provided.
- **Email**: Must be provided and follow a valid email format.
- **Survey Topic**: Must be selected.
- **Technology Section Fields**: Required if "Technology" is selected, and validate accordingly.
  - **Favorite Programming Language**: Required.
  - **Years of Experience**: Required and must be greater than 0.
- **Health Section Fields**: Required if "Health" is selected, and validate accordingly.
  - **Exercise Frequency**: Required.
  - **Diet Preference**: Required.
- **Education Section Fields**: Required if "Education" is selected, and validate accordingly.
  - **Highest Qualification**: Required.
  - **Field of Study**: Required.
- **Feedback**: Required and must be at least 50 characters.

## Submission

On submission, the form validates the inputs based on the criteria outlined above. If the validation passes, additional questions are fetched from an external API based on the selected survey topic, and the form data, along with the additional questions, is displayed as a JSON summary.

## Implementation Details

### `useFormValidation.js` (Custom Hook for Form Validation)

This custom hook manages the validation logic for the form.

```jsx
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

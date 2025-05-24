import { useState, useCallback } from 'react';

const useFormValidation = (initialState = {}, validationRules = {}) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validate = useCallback((fieldValues = values) => {
    const tempErrors = {};
    
    Object.keys(validationRules).forEach(key => {
      const value = fieldValues[key];
      const rules = validationRules[key];
      
      if (rules.required && !value) {
        tempErrors[key] = 'هذا الحقل مطلوب';
      }
      
      if (rules.minLength && value.length < rules.minLength) {
        tempErrors[key] = `يجب أن يكون الطول على الأقل ${rules.minLength} حروف`;
      }
      
      if (rules.maxLength && value.length > rules.maxLength) {
        tempErrors[key] = `يجب أن لا يتجاوز الطول ${rules.maxLength} حروف`;
      }
      
      if (rules.pattern && !rules.pattern.test(value)) {
        tempErrors[key] = rules.message || 'القيمة غير صحيحة';
      }
      
      if (rules.custom) {
        const customError = rules.custom(value, fieldValues);
        if (customError) {
          tempErrors[key] = customError;
        }
      }
    });

    return tempErrors;
  }, [values, validationRules]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (touched[name]) {
      const validationErrors = validate({ ...values, [name]: value });
      setErrors(prev => ({
        ...prev,
        [name]: validationErrors[name]
      }));
    }
  }, [touched, validate, values]);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    const validationErrors = validate();
    setErrors(prev => ({
      ...prev,
      [name]: validationErrors[name]
    }));
  }, [validate]);

  const handleSubmit = useCallback((onSubmit) => (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(values);
    }
  }, [validate, values]);

  const resetForm = useCallback(() => {
    setValues(initialState);
    setErrors({});
    setTouched({});
  }, [initialState]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setValues
  };
};

export default useFormValidation; 
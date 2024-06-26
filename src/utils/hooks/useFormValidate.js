import { useCallback, useState } from "react";

export default function useFormValidate() {
  // Состояние для хранения введенных значений полей формы
  const [formValues, setFormValues] = useState({});
  // Состояние для хранения ошибок валидации полей формы
  const [errors, setErrors] = useState({});
  // Состояние для хранения общей валидности формы
  const [isFormValid, setIsFormValid] = useState(false);
  // Состояние для хранения информации о валидности каждого поля ввода
  const [isInputValid, setIsInputValid] = useState({});

  //console.log(isFormValid)

  function handleChange(evt) {
    const { name, value, validationMessage, validity, form } = evt.target;

    setFormValues((prevFormValues) => ({ ...prevFormValues, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: validationMessage }));
    setIsInputValid((prevIsInputValid) => ({
      ...prevIsInputValid,
      [name]: validity.valid,
    }));
    setIsFormValid(form.checkValidity());
  }

  function resetForm(data = {}) {
    setFormValues(data);
    setErrors({});
    setIsFormValid(false);
    setIsInputValid({});
  }

  const setInitialValue = useCallback((name, value) => {
    setFormValues((prevFormValues) => ({ ...prevFormValues, [name]: value }));
  }, []);

  return {
    formValues,
    errors,
    isFormValid,
    isInputValid,
    handleChange,
    resetForm,
    setInitialValue,
  };
}

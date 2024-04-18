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

  function resetFormNew() {
    setFormValues({});
    setErrors({});
    setIsFormValid(false);
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
    resetFormNew,
  };
}
// import { useCallback, useState } from "react";

// export default function useFormValidate() {
//   const [formValues, setFormValues] = useState({});
//   const [errors, setErrors] = useState({});
//   const [isFormValid, setIsFormValid] = useState(false);
//   const [isInputValid, setIsInputValid] = useState({});

//   function handleChange(evt) {
//     const { name, value, validationMessage, validity, form } = evt.target;

//     setFormValues((prevFormValues) => ({ ...prevFormValues, [name]: value }));
//     setErrors((prevErrors) => ({ ...prevErrors, [name]: validationMessage }));
//     setIsInputValid((prevIsInputValid) => ({
//       ...prevIsInputValid,
//       [name]: validity.valid,
//     }));
//     setIsFormValid(form.checkValidity());
//   }

//   function resetForm(data = {}) {
//     setFormValues(data);
//     setErrors({});
//     setIsFormValid(false);
//     setIsInputValid({});
//   }

//   const setInitialValues = useCallback((values) => {
//     setFormValues(values);
//     // Предположим, что начальные значения корректны:
//     const newErrors = Object.keys(values).reduce(
//       (acc, key) => ({ ...acc, [key]: "" }),
//       {}
//     );
//     const newIsInputValid = Object.keys(values).reduce(
//       (acc, key) => ({ ...acc, [key]: true }),
//       {}
//     );
//     setErrors(newErrors);
//     setIsInputValid(newIsInputValid);
//     setIsFormValid(true); // Предполагаем, что форма валидна при установке корректных начальных значений
//   }, []);

//   return {
//     formValues,
//     errors,
//     isFormValid,
//     isInputValid,
//     handleChange,
//     resetForm,
//     setInitialValues,
//   };
// }

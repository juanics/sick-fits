import { useState, useEffect  } from 'react';

const useForm = (initial = {}) => {
   const [inputs, setInputs] = useState(initial);
   const initialValues = Object.values(initial).join('');

   useEffect(() => {
      setInputs(initial)
   }, [initialValues])
   const handleChange = (e) => {
      let { name, type, value } = e.target;
      if (type === 'number') value = Number(value);
      if (type === 'file') [value] = e.target.files;
      setInputs({
         ...inputs,
         [name]: value,
      });
   };

   const resetForm = () => {
      setInputs(initial);
   }

   const clearForm = () => {
      const keys = Object.keys(inputs);
      const newState = {};
      keys.forEach(k => newState[k] = '');
      setInputs(newState)
   }

   return [
      inputs,
      handleChange,
      resetForm,
      clearForm
   ];
};

export default useForm;

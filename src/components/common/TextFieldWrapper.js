import { TextField } from '@material-ui/core';
import { useField } from 'formik';
import React from 'react';

const TextFieldWrapper = (props) => {
  const [field, meta] = useField(props);
  const validationFailed = meta.touched && !!meta.error;

  return (
    <TextField
      {...field}
      {...props}
      error={validationFailed}
      helperText={validationFailed && meta.error}
    />
  );
};

export default TextFieldWrapper;

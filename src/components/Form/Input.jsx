import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import { FormControl, InputLabel, OutlinedInput, FormLabel } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

export default function CInput({ name, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const { label } = {...rest}

  useEffect(() => {
    debugger
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: ref => {
        debugger
        return ref.current.children[0].value
      },
      setValue: (ref, value) => {
        ref.current.children[0].value = value
      },
    })
  }, [fieldName, registerField])

  return (
    <div>
      {/* <TextField
        {...rest}
        ref={inputRef}
      /> */}

      <FormControl variant="outlined" style={{width: '100%'}}>
        <InputLabel htmlFor="component-outlined">{label}</InputLabel>
        <OutlinedInput {...rest} ref={inputRef} id="component-outlined" label="Name" />
      </FormControl>

      {error && <Alert severity="error">{error}</Alert>}
    </div>
  )
}

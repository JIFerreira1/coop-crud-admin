import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import {
  FormControl,
  Select
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import MenuItem from '@material-ui/core/MenuItem';

export default function CRadioButton({ name, ...rest }) {
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
        return ref.current.children[1].value
      },
      setValue: (ref, value) => {
        debugger
        ref.current.children[1].value = value
      },
    })
  }, [fieldName, registerField])

  return (
    <div>
      <FormControl variant="outlined">
        <Select
          displayEmpty={true}
          defaultValue={"sms"}
          ref={inputRef}
        >
          <MenuItem key={"sms"} value={"sms"}>SMS</MenuItem>
          <MenuItem key={"email"} value={"email"}>E-mail</MenuItem>
        </Select>
      </FormControl>

      {error && <Alert severity="error">{error}</Alert>}
    </div>
  )
}

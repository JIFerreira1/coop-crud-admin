import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import { 
  FormLabel,
  FormControl, 
  InputLabel,
  Select,
  RadioGroup, 
  FormControlLabel, 
  Radio
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

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
        return ref.current.children[0].value
      },
      setValue: (ref, value) => {
        ref.current.children[0].value = value
      },
    })
  }, [fieldName, registerField])

  return (
    <div>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>

      {error && <Alert severity="error">{error}</Alert>}
    </div>
  )
}

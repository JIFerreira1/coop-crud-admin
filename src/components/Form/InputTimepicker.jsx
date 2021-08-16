import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import { FormControl, InputLabel, OutlinedInput, TextField, Grid, FormLabel, FormGroup } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

export default function CInputTimepicker({ name, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, error } = useField(name);

  useEffect(() => {
    debugger
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: ref => {
        debugger
        return `${ref.current.offsetParent.children[0].lastChild.firstElementChild.value} ás ${ref.current.offsetParent.children[1].lastChild.firstElementChild.value}`
      },
      setValue: (ref, value) => {
        debugger
        ref.current.offsetParent.children[0].lastChild.firstElementChild.value = value.horarioSegunda
        ref.current.offsetParent.children[1].lastChild.firstElementChild.value = value.horarioSabado
      },
    })
  }, [fieldName, registerField])

  return (
    <>
        <FormLabel style={{float: 'left', marginBottom: '8px'}}>Funcionamento de {fieldName.includes('Seg') ? 'Segunda á Sábado' : 'Domingo á Feriado'}</FormLabel>
        <FormControl style={{width: '100%', float: 'left', display: 'block'}}>
            <TextField
              style={{marginRight: '3%'}}
              {...rest}
              ref={inputRef}
              inputProps={{
                step: 300, // 5 min
            }}/>
            <TextField
              {...rest}
              ref={inputRef}
              inputProps={{
                step: 300, // 5 min
              }}
            />
        </FormControl>
      {error && <Alert severity="error">{error}</Alert>}
    </>
  )
}

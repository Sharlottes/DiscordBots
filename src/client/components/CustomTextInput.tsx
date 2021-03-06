import React from 'react';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { FormControl, InputLabel, Input, InputAdornment, IconButton, Typography, Tooltip } from '@mui/material';

interface CustomTextInputProps {
  handleChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  enable?: boolean; //default enable
  name: string; //input title
  value: string; //default value
  cons?: [(value: string) => boolean, string][] //cons, error message
  privated?: boolean; //whether input is private like password
  required?: boolean; //whether input required
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  handleChange,
  value, name,
  enable = true,
  privated = false,
  required = true,
  cons = required ? [[(value: string) => required && value !== '', "input required"]] : []
}) => {
  const [show, setShow] = React.useState(false);

  const isValid = cons.every(c => c[0](value));

  return (
    <Tooltip title="This input is required" disableHoverListener={!required}>
      <FormControl variant='standard' disabled={!enable}>
        <InputLabel htmlFor={`input-${name}`}>{name} {required ? '*' : ''}</InputLabel>
        <Input
          error={!isValid}
          id={`input-${name}`}
          type={privated
            ? (show ? 'text' : 'password')
            : 'text'
          }
          value={value}
          onChange={handleChange}
          endAdornment={
            <>{privated &&
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={() => setShow(prev => !prev)}
                  onMouseDown={evt => evt.preventDefault()}
                >
                  {show ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }</>
          }
        />
        {!isValid && (
          cons.reduce((a, [con, errmsg], i) => con(value) ? a : [...a, <Typography key={i} variant='caption' sx={{ ml: '10px', color: 'red' }}>{errmsg}</Typography>], [<div key='empty'></div>])
        )}
      </FormControl>
    </Tooltip>
  )
}

export default CustomTextInput;
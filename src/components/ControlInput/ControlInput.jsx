import { useState } from 'react';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

import { Controller } from 'react-hook-form';
import Iconify from '../iconify/iconify';

function ControlInput({ name, error, helperText, type, control, fullWidth, mulitine, label,icon }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <>
      {type !== 'password' ? (
        <Controller
          name={name}
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              sx={{ width: '100%' }}
              fullWidth={fullWidth}
              {...field}
              name={name}
              multiline={mulitine}
              type={type}
              label={label}
              variant="outlined"
              error={error}
              helperText={helperText}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="start">
                      <Iconify icon={icon} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
      ) : (
        <Controller
          name={name}
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              sx={{ width: '100%' }}
              fullWidth={fullWidth}
              {...field}
              name={name}
              label={label}
              type={(type = showPassword ? 'text' : 'password')}
              variant="outlined"
              error={error}
              helperText={helperText}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
      )}
    </>
  );
}

export default ControlInput;

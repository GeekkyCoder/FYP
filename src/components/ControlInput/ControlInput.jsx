import { useState } from 'react';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';

import { Controller } from 'react-hook-form';
import Iconify from '../iconify/iconify';

function ControlInput({
  name,
  error,
  helperText,
  type,
  control,
  fullWidth,
  mulitine,
  label,
  icon,
  sx
}) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <>
      {type !== 'password' ? (
        <Box>
          <InputLabel shrink htmlFor={name} sx={{color:name==="Email" || name === "Message" ? "white" : "" }}>
            {name.toUpperCase()}
          </InputLabel>
          <Controller
            name={name}
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
              sx={{...sx,width:"100%"}}
                fullWidth={fullWidth}
                {...field}
                name={name}
                multiline={mulitine}
                placeholder={name}
                type={type}
                label={label}
                variant="outlined"
                error={error}
                size="medium"
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
        </Box>
      ) : (
        <Box>
          <Controller
            name={name}
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                fullWidth={fullWidth}
                {...field}
                name={name}
                placeholder={name}
                sx={{...sx,width:"100%"}}
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
        </Box>
      )}
    </>
  );
}

export default ControlInput;

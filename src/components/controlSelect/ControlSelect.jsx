import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';

import { Controller } from 'react-hook-form';

const SelectComp = ({ name, control, label, menuItems, fullWidth }) => {
  return (
    <Box>
      <InputLabel shrink htmlFor={name}>
        {name.toUpperCase()}
      </InputLabel>
      <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        defaultValue={menuItems[0]} // Provide a default value if needed
        render={({ field }) => (
          <Select
            {...field}
            name={name}
            label={label}
            sx={{ width: '100%' }}
            fullWidth={fullWidth}
      
          >
            {menuItems?.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </Box>
  );
};

export default SelectComp;

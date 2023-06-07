import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export const SelectOption = ({ value, handleChange, title, name, size }) => {
  return (
    <div>
      <FormControl sx={{ width: `${size}px` }}>
        <InputLabel>{title}</InputLabel>
        <Select value={value} onChange={handleChange} name={name} label={title}>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

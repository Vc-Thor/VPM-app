import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';

export const TextFieldCustom = ({
  size,
  disable,
  dfValue,
  title,
  type,
  symbol,
  min,
  max,
  name,
}) => {
  return (
    <div>
      <FormControl sx={{ width: `${size}px` }} variant='outlined'>
        <InputLabel htmlFor='outlined-adornment-password'>{title}</InputLabel>
        <OutlinedInput
          type={`${type}`}
          endAdornment={
            <InputAdornment position='end'>{symbol}</InputAdornment>
          }
          name={`${name}`}
          label={title}
          defaultValue={dfValue}
          disabled={disable}
          inputProps={{
            min: `${min}`,
            max: `${max}`,
          }}
        />
      </FormControl>
    </div>
  );
};

import { Paper, Slider } from '@mui/material';

export const Range = () => {
  return (
    <Paper sx={{ border: '1px solid #000', padding: 2, height: 300 }}>
      <Slider
        min={0}
        step={1}
        max={100}
        valueLabelDisplay='auto'
        aria-labelledby='non-linear-slider'
        orientation='vertical'
      />
      <Slider
        min={5}
        step={1}
        max={30}
        valueLabelDisplay='auto'
        aria-labelledby='non-linear-slider'
        orientation='vertical'
      />
      <Slider
        min={5}
        step={1}
        max={30}
        valueLabelDisplay='auto'
        aria-labelledby='non-linear-slider'
        orientation='vertical'
      />
      <Slider
        min={5}
        step={1}
        max={30}
        valueLabelDisplay='auto'
        aria-labelledby='non-linear-slider'
        orientation='vertical'
      />
      <Slider
        min={5}
        step={1}
        max={30}
        valueLabelDisplay='auto'
        aria-labelledby='non-linear-slider'
        orientation='vertical'
      />
      <Slider
        min={5}
        step={1}
        max={30}
        valueLabelDisplay='auto'
        aria-labelledby='non-linear-slider'
        orientation='vertical'
      />
    </Paper>
  );
};
// https://meet.google.com/qxr-reja-dte

import { Container, Grid } from '@mui/material';
import { useState } from 'react';
import { SelectOption } from './components/SelectOption';
import { TextFieldCustom } from './components/TextFieldCustom';
import { Range } from './components/Range';
export const Prueba = () => {
  const [age, setAge] = useState('');
  const [age1, setAge1] = useState('');
  const [age2, setAge2] = useState('');
  const [age3, setAge3] = useState('');
  const handleChange = (event) => {
    setAge(event.target.value);
    console.log(event);
  };
  const handleChange1 = (event) => {
    setAge1(event.target.value);
  };
  const handleChange2 = (event) => {
    setAge2(event.target.value);
  };
  const handleChange3 = (event) => {
    setAge3(event.target.value);
  };

  return (
    <Container
      sx={{
        flexGrow: 1,
        border: '1px solid #000',
        padding: 3,
      }}>
      <Grid container spacing={2}>
        <Grid item xs={3.2}>
          <TextFieldCustom
            size={300}
            title={'Vector Name'}
            name={'vector_name'}
            type={'text'}
          />
        </Grid>
        <Grid item xs={2}>
          <SelectOption
            value={age}
            handleChange={handleChange}
            title={'Area'}
            name={'area'}
            size={180}
          />
        </Grid>
        <Grid item xs={2}>
          <SelectOption
            value={age1}
            handleChange={handleChange1}
            title={'Sub Area'}
            name={'sub_area'}
            size={180}
          />
        </Grid>
        <Grid item xs={2.2}>
          <SelectOption
            value={age2}
            handleChange={handleChange2}
            title={'Activity'}
            name={'activity'}
            size={200}
          />
        </Grid>
        <Grid item xs={2.2}>
          <TextFieldCustom
            name={'availability'}
            size={100}
            dfValue={100}
            type={'number'}
            title={'Availability'}
            symbol={'%'}
            min={1}
            max={100}
          />
        </Grid>
        <Grid item xs={2.4}>
          <SelectOption
            value={age3}
            handleChange={handleChange3}
            title={'Criteria'}
            name={'criteria'}
            size={220}
          />
        </Grid>
        <Grid item xs={1.8}>
          <TextFieldCustom
            name={'power_input'}
            size={160}
            title={'Power Input'}
            symbol={'KW'}
            type={'number'}
            min={0}
          />
        </Grid>
        <Grid item xs={1.5}>
          <TextFieldCustom
            name={'air_velocity'}
            size={140}
            title={'Air Velocity'}
            symbol={'m/s'}
            type={'number'}
            min={0}
          />
        </Grid>
        <Grid item xs={1.6}>
          <TextFieldCustom
            name={'air_m2'}
            size={140}
            title={'Air m2'}
            type={'number'}
            min={0}
          />
        </Grid>
        <Grid item xs={1.6}>
          <TextFieldCustom
            name={'fix_q'}
            size={140}
            title={'Fix Q'}
            symbol={'m3/s'}
            type={'number'}
            min={0}
          />
        </Grid>
      </Grid>
      <Range />
    </Container>
  );
};

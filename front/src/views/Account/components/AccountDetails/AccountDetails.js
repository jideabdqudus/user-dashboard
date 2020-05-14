import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {}
}));
const marks = [
  {
    value: 1,
    label: '1hr',
  },
  {
    value: 25,
    label: '25hrs',
  },
  {
    value: 40,
    label: '40hrs',
  },
  {
    value: 80,
    label: '80hrs',
  },
];

function valuetext(value) {
  return `${value}hrs`;
}

const AccountDetails = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState({
    firstName: 'Shen',
    lastName: 'Zhi',
    email: 'shen.zhi@devias.io',
    phone: '',
    state: 'Alabama',
    country: 'USA'
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const states = [
    {
      value: 'alabama',
      label: 'Alabama'
    },
    {
      value: 'new-york',
      label: 'New York'
    },
    {
      value: 'san-francisco',
      label: 'San Francisco'
    }
  ];

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form
        autoComplete="off"
        noValidate
      >
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="Title"
                margin="dense"
                name="firstName"
                onChange={handleChange}
                required
                value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
            <TextField
              fullWidth
              id="outlined-multiline-static"
              label="Story"
              required
              multiline
              onChange={handleChange}
              margin="dense"
              rows={10}
              defaultValue="Story here"
              variant="outlined"
            />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
            <TextField
            fullWidth
            label="Select State"
            margin="dense"
            name="state"
            onChange={handleChange}
            required
            select
            // eslint-disable-next-line react/jsx-sort-props
            SelectProps={{ native: true }}
            value={values.state}
            variant="outlined"
          >
            {states.map(option => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </TextField>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
            <TextField
            fullWidth
            label="Select State"
            margin="dense"
            name="state"
            onChange={handleChange}
            required
            select
            // eslint-disable-next-line react/jsx-sort-props
            SelectProps={{ native: true }}
            value={values.state}
            variant="outlined"
          >
            {states.map(option => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </TextField>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
          <Typography id="discrete-slider-always" gutterBottom>
        Estimated time
      </Typography>
            <Slider
            defaultValue={80}
            getAriaValueText={valuetext}
            aria-labelledby="discrete-slider-always"
            step={10}
            marks={marks}
            valueLabelDisplay="on"
          />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Cost in $"
                margin="dense"
                name="country"
                onChange={handleChange}
                required
                defaultValue=" "
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="contained"
          >
            Save details
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string
};

export default AccountDetails;

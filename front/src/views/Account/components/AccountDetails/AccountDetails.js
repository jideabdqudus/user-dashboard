import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
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
import { AuthConsumer, useSignUpForm } from '../../../../components/core';
import requestClient from '../../../../library/client';
import { handleApiErrors, isAdmin } from '../../../../library/utils';

const useStyles = makeStyles(() => ({
  root: {}
}));
const marks = [
  {
    value: 1,
    label: '1hr'
  },
  {
    value: 25,
    label: '25hrs'
  },
  {
    value: 40,
    label: '40hrs'
  },
  {
    value: 80,
    label: '80hrs'
  }
];

function valuetext(value) {
  return `${value}hrs`;
}

const AccountDetails = (props) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { inputs, handleInputChange } = useSignUpForm();

  const createNewStory = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const {
      storySummary,
      storyDescription,
      storyType,
      storyComplexity,
      estimatedTime,
      associatedCost
    } = inputs;

    const payload = {
      summary: storySummary,
      description: storyDescription,
      type: storyType,
      complexity: storyComplexity,
      cost: associatedCost,
      estimatedHrs: estimatedTime
    };

    setLoading(true);

    const response = await requestClient()
      .post(`/v1/stories`, payload)
      .catch((err) => {
        return err;
      });

    setLoading(false);

    const apiErrors = handleApiErrors(response);

    if (apiErrors) {
      setError(apiErrors);
      return;
    }

    setSuccess(true);
    setTimeout(() => history.push('/stories'), 2000);
  };

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

  const handleChange = (event) => {
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
    <Card {...rest} className={clsx(classes.root, className)}>
      <form autoComplete="off" noValidate onSubmit={(e) => createNewStory(e)}>
        <CardHeader
          subheader="The information can be edited"
          title="Create a story"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="Title"
                margin="dense"
                name="firstName"
                onChange={handleInputChange}
                required
                defaultValue="  "
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                id="outlined-multiline-static"
                label="Story"
                required
                multiline
                onChange={handleInputChange}
                margin="dense"
                rows={10}
                defaultValue="Story here"
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Type"
                margin="dense"
                name="state"
                onChange={handleInputChange}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                value={values.state}
                variant="outlined">
                <option value={' '}>Pick Options</option>
                <option value={'enhancement'}>Enhancement</option>
                <option value={'bugfix'}>Bugfix</option>
                <option value={'development'}>Development</option>
                <option value={'qa'}>QA</option>
              </TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Complexity"
                margin="dense"
                name="state"
                onChange={handleInputChange}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                value={values.state}
                variant="outlined">
                <option value={' '} disabled>
                  -- Select --
                </option>
                <option value={'low'}>Low</option>
                <option value={'mid'}>Medium</option>
                <option value={'high'}>High</option>
              </TextField>
            </Grid>
            <Grid item md={6} xs={12}>
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
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Cost in $"
                margin="dense"
                name="country"
                onChange={handleInputChange}
                required
                defaultValue=" "
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button disabled={loading || success} color="primary" variant="contained">
            Create Story
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

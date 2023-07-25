import { Button, Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../features/todoSlice';
import { useMutation } from '@apollo/react-hooks';
import { ADD_TODO } from '../services/apiService';

const AddTodo: React.FC = () => {
  const dispatch = useDispatch();
  const [addTask, { data }] = useMutation(ADD_TODO);

  const [newVal, setNewVal] = useState('');

  const add = (event: React.FormEvent) => {
    event.preventDefault();

    if (newVal) {
      addTask({ variables: { name: newVal } });
      setNewVal('');
    }
  };

  useEffect(() => {
    if (data) {
      dispatch(actions.addTask(data.addTask));
    }
  }, [data]);

  return (
    <form onSubmit={add}>
      <Grid container spacing={12}>
        <Grid item xs={6}>
          <TextField
            value={newVal}
            onChange={e => setNewVal(e.target.value)}
            placeholder="add task..."
          />
        </Grid>
        <Grid item xs>
          <Button type="submit" variant="contained">
            ADD TODO
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddTodo;

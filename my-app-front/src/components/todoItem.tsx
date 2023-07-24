import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../features/todoSlice';
import { TaskProps } from './todoList';
import { useMutation } from '@apollo/react-hooks';
import { DELETE_TASK, TOGGLE_TASK } from '../services/apiService';

function TodoItem({ task }: TaskProps) {
  const dispatch = useDispatch();

  const [deleteTask, { data: deleteData }] = useMutation(DELETE_TASK);
  const [toggleTask, { data: toggleData }] = useMutation(TOGGLE_TASK);

  const [checked, setChecked] = useState(task.iscompleted);

  const handleToggle = () => {
    toggleTask({ variables: { id: task.id } });
    dispatch(actions.toggleTask({ delId: task.id }));
  };

  const deleteTodo = () => {
    deleteTask({ variables: { id: task.id } });
    dispatch(actions.deleteTask({ delId: task.id }));
  };

  useEffect(() => {
    if (toggleData) {
      setChecked(toggleData.toggleTask.iscompleted);
      dispatch(actions.toggleTask({ delId: task.id }));
    }
  }, [toggleData]);

  return (
    <div>
      <ListItem
        // key={key}
        secondaryAction={
          <IconButton onClick={deleteTodo} edge="end" aria-label="comments">
            <DeleteIcon style={{ color: 'red' }} />
          </IconButton>
        }
        disablePadding
      >
        <ListItemButton>
          <ListItemIcon onClick={handleToggle}>
            <Checkbox edge="start" checked={task.iscompleted} />
          </ListItemIcon>
          <ListItemText
            primary={`${task.name}`}
            style={{
              fontStyle: checked ? 'italic' : 'normal',
              textDecorationLine: checked ? 'line-through' : 'none',
              color: checked ? 'gray' : 'black',
            }}
          />
        </ListItemButton>
      </ListItem>
    </div>
  );
}

export default TodoItem;

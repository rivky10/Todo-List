import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { actions } from '../features/todoSlice';
import { useMutation } from '@apollo/react-hooks';
import { DELETE_TASK, TOGGLE_TASK } from '../services/apiService';
import { Task } from './TodoList';

export interface TaskProps {
  task: Task;
}

const TodoItem: React.FC<TaskProps> = ({ task }) => {
  const dispatch = useDispatch();

  const [deleteTask] = useMutation(DELETE_TASK);
  const [toggleTask] = useMutation(TOGGLE_TASK);

  const handleToggle = () => {
    toggleTask({ variables: { id: task.id } });
    dispatch(actions.toggleTask({ delId: task.id }));
  };

  const deleteTodo = () => {
    deleteTask({ variables: { id: task.id } });
    dispatch(actions.deleteTask({ delId: task.id }));
  };

  return (
    <div>
      <ListItem
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
            primary={task.name}
            style={{
              fontStyle: task.iscompleted ? 'italic' : 'normal',
              textDecorationLine: task.iscompleted ? 'line-through' : 'none',
              color: task.iscompleted ? 'gray' : 'black',
            }}
          />
        </ListItemButton>
      </ListItem>
    </div>
  );
};

export default TodoItem;

import { MyDataSource } from '../app';
import { Task } from '../entity/todo';

export const resolversTodo = {
  Query: {
    tasks: async () => {
      const tasksRepository = MyDataSource.getRepository(Task);
      const tasks = await tasksRepository.find({
        order: {
          id: 'ASC',
        },
      });
      return tasks;
    },
  },

  Mutation: {
    addTask: async (_: any, { name }: { name: string }) => {
      const tasksRepository = MyDataSource.getRepository(Task);
      const task = tasksRepository.create({ name, iscompleted: false });
      const newTask = await MyDataSource.getRepository(Task).save(task);
      return newTask;
    },

    deleteTask: async (_: any, { id }: { id: number }) => {
      const tasksRepository = MyDataSource.getRepository(Task);
      const taskToDelete = await tasksRepository.findOne({ where: { id } });

      if (!taskToDelete) {
        return false; // Task with the given ID was not found
      }

      await tasksRepository.delete(id);
      return true; // Task successfully deleted
    },

    toggleTask: async (_: any, { id }: { id: number }) => {
      const tasksRepository = MyDataSource.getRepository(Task);
      const task = await tasksRepository.findOne({ where: { id } });
      if (!task) {
        throw new Error('Task not found');
      }
      task.iscompleted = !task.iscompleted;
      await tasksRepository.save(task);
      return task;
    },
  },
};

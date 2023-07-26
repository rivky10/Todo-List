import { ApolloProvider } from '@apollo/client';
import './App.css';
import TodoList from './components/TodoList';
import { apolloClient } from './services/apiService';

const App: React.FC = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <TodoList />
    </ApolloProvider>
  );
};

export default App;

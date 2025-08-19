import AppRouter from './utilities/AppRouter';
import { AuthProvider } from './context/AuthContext';
import './App.scss';

const App = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
};

export default App;

import { Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/Auth/LoginPage';
import RegisterPage from '../pages/Auth/RegisterPage';
import PrivateRoute from './PrivateRoute';
import HomePage from '../pages/HomePage';

const AppRouter = () => {
    return (
        <Routes>
            {/* Auth routes */}
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            
            {/* Public routes */}
            
            {/* Private routes */}
            <Route element={<PrivateRoute />}>
                <Route path='/' element={<HomePage />} />
            </Route>
            
            {/* Default route */}
            {/* <Route path='*' element={<NotFound />} /> */}
        </Routes>
    );
};

export default AppRouter;
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import RegisterPage from '../pages/RegisterPage';
import CheckEmailPage from "../pages/CheckEmailPage";
import CheckPasswordPage from "../pages/CheckPasswordPage";
import Home from '../pages/Home';
import MessagePage from '../components/MessagePage';
import AuthLayouts from '../layout';

const router = createBrowserRouter([
    {
        path : '/',
        element : <App/>,
        children : [
            {
                path : 'registrarme',
                element : <AuthLayouts><RegisterPage/></AuthLayouts>
            },
            {
                path : 'login-correo',
                element : <AuthLayouts><CheckEmailPage/></AuthLayouts>
            },
            {
                path : 'login-contraseña',
                element : <AuthLayouts><CheckPasswordPage/></AuthLayouts>
            },
            {
                path : '',
                element : <Home/>,
                children : [
                    {
                        path : ':userId',
                        element : <MessagePage/>
                    }
                ]
            }
        ]
    }
]);

export default router;
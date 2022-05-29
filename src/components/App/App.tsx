import React   from 'react';
import {
    HomePage,
    ProfilePage,
    LoginPage,
    RegisterPage,
    ForgotPasswordPage,
    ResetPasswordPage,
    IngredientPage,
    NotFound404
} from '../../pages';
import Header from "../AppHeader/AppHeader";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";
import {
    Switch,
    Route,
    useLocation,
    useHistory } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route';


export const App: React.FC = () => {

    const location = useLocation<any>();
    const history = useHistory<any>();
    const background = location.state && location.state.background;
    const returnFromModal = () => {
        history.goBack();
    };

    return (
        <div>
            <Header />
            <Switch location={background || location}>
                <Route path="/login" exact={true}>
                    <LoginPage />
                </Route>
                <Route path="/register" exact={true}>
                    <RegisterPage />
                </Route>
                <Route path="/forgot-password" exact={true}>
                    <ForgotPasswordPage />
                </Route>
                <Route path="/reset-password" exact={true}>
                    <ResetPasswordPage />
                </Route>
                <Route path="/" exact={true}>
                    <HomePage />
                </Route>
                <Route path="/ingredients/:id" exact={true}>
                    { (!background) ? <IngredientPage /> : <HomePage /> }
                </Route>
                <ProtectedRoute path="/profile" exact={false}>
                    <ProfilePage />
                </ProtectedRoute>
                <Route>
                    <NotFound404 />
                </Route>
            </Switch>
            {background && (
                <Route path='/ingredients/:id' exact={true}>
                    <Modal onClose={returnFromModal}>
                        <IngredientDetails />
                    </Modal>
                </Route>
            )}
        </div>
    );
}
export default App;


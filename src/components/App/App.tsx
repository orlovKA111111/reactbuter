import React   from 'react';
import {
    HomePage,
    ProfilePage,
    ProfileOrderPage,
    ProfileOrdersPage,
    LoginPage,
    RegisterPage,
    ForgotPasswordPage,
    ResetPasswordPage,
    IngredientPage,
    FeedPage,
    OrderPage,
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
import FeedDetails from "../FeedDetails/FeedDetails";
import { useAppDispatch } from "../../services/hooks";
import { getIngredients } from "../../services/action/ingredients";


export const App: React.FC = () => {

    const location = useLocation<any>();
    const history = useHistory<any>();
    const background = location.state && location.state.background;
    const returnFromModal = () => {
        history.goBack();
    };
    const dispatch = useAppDispatch();

    React.useEffect(
        () => {
            dispatch(getIngredients());
        },
        [dispatch]
    );

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
                <Route path="/feed/:id" exact={true}>
                    { (!background) ? <OrderPage /> : <FeedPage /> }
                </Route>
                <Route path="/feed" exact={true}>
                    <FeedPage />
                </Route>
                <Route path="/" exact={true}>
                    <HomePage />
                </Route>
                <Route path="/ingredients/:id" exact={true}>
                    { (!background) ? <IngredientPage /> : <HomePage /> }
                </Route>
                <ProtectedRoute path="/profile" exact={true}>
                    <ProfilePage />
                </ProtectedRoute>
                <ProtectedRoute path="/profile/orders" exact={true}>
                    <ProfileOrdersPage />
                </ProtectedRoute>
                <ProtectedRoute  path='/profile/orders/:id' exact={true}>
                    { (!background) ? <ProfileOrderPage /> : <ProfileOrdersPage /> }
                </ProtectedRoute >
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
            {background && (
                <Route path='/feed/:id' exact={true}>
                    <Modal onClose={returnFromModal}>
                        <FeedDetails isProfile={false} />
                    </Modal>
                </Route>
            )}
            {background && (
                <Route path='/profile/orders/:id' exact={true}>
                    <Modal onClose={returnFromModal}>
                        <FeedDetails isProfile={true} />
                    </Modal>
                </Route>
            )}
        </div>
    );
}
export default App;


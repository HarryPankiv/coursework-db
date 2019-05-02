import * as React from 'react';
import ReactDOM from 'react-dom';
import { Switch, BrowserRouter, Route } from 'react-router-dom';

import Home from './components/Home/Home';
import Items from './components/Items/Items';
import OrderFormWrapper from './components/OrderForm/OrderFormWrapper';
import Warehouse from './components/Warehouse/Warehouse';

import GlobalStyles from './styles/global'

const App = () => (
    <>
        <GlobalStyles />
        <BrowserRouter>
            <Switch>
                <Route path='/add-order' component={OrderFormWrapper} />
                <Route path='/item-list' component={Items} />
                <Route path='/warehouse' component={Warehouse} />
                <Route path='/' component={Home} />
            </Switch>
        </BrowserRouter>
    </>
)

ReactDOM.render(<App />, document.getElementById('root'));

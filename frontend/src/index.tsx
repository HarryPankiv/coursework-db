import * as React from 'react';
import ReactDOM from 'react-dom';

import GlobalStyles from './styles/global'
import Routes from './routes/Routes';

import "react-datepicker/dist/react-datepicker.css";

const App = () => (
    <>
        <GlobalStyles />
        <Routes />
    </>
)

ReactDOM.render(<App />, document.getElementById('root'));

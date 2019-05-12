import * as React from 'react';
import ReactDOM from 'react-dom';

import GlobalStyles from './styles/global'
import Routes from './routes/Routes';

const App = () => (
    <>
        <GlobalStyles />
        <Routes />
    </>
)

ReactDOM.render(<App />, document.getElementById('root'));

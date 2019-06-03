import { observer } from 'mobx-react-lite';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import Select from '../Select';

const GlobalStyles = createGlobalStyle`
    body {
        margin:0; 
        padding:0; 
        box-sizing: border-box;
        @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
        font-family: 'Roboto', sans-serif;
        color: #444;
        font-size: 18px;
    }
`;


export const App = observer(() => {
    return (
        <>
            <GlobalStyles />
            {/* I had some idea about using routes, but i ran out of time. Sorry */}
            <Router>
                <Switch>
                    <Route component={Select} />
                </Switch>
            </Router>
        </>
    );
});

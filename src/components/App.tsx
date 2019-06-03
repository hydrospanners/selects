import { observer } from 'mobx-react-lite';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Select from './Select';
import { createGlobalStyle } from 'styled-components'
const GlobalStyles = createGlobalStyle`
    body {
        margin:0; 
        padding:0; 
        box-sizing: border-box;
        @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
        font-family: 'Roboto', sans-serif;
        color: #444;
        font-size: 32px;

    }
`;


export const App = observer(() => {
    return (
        <>
            <GlobalStyles />
            <Router>
                <Switch>
                    <Route component={Select} />
                </Switch>
            </Router>
        </>
    );
});

import React from 'react';
import styled from 'styled-components';

import { CurrentPost } from './components/CurrentPost';
import { SelectForm } from './components/SelectForm';
import { ViewHistory } from './components/ViewHistory';

export default () => (
    <StyledPostMain>
        <SelectForm />
        <CurrentPost />
        <ViewHistory />
    </StyledPostMain>
);

const StyledPostMain = styled.main`
    display: grid; 
    grid-template-columns: repeat(2, minmax(200px, 1fr));
    grid-template-rows: repeat(2, 1fr);
    background-color: plum;

    height: 100vh; 
`;

import React, { useEffect } from 'react';
import styled from 'styled-components';

import { Window } from './../components/Window';
import { HorribleGreenBox } from './components/HorribleGreenBox';
import { Post } from './components/Post';
import { SelectForm } from './components/SelectForm';

export default () => {
    useEffect(() => {
    }, [])
    return (
        <StyledPostMain>
            <SelectForm />
            <Post />
            <HorribleGreenBox />
        </StyledPostMain>

    )
}

const StyledPostMain = styled.main`
    display: grid; 
    grid-template-columns: repeat(2, minmax(200px, 1fr));
    grid-template-rows: repeat(2, 1fr);
    background-color: plum;

    height: 100vh; 
`;

export const StyledEmptyWindow = styled(Window)`
    grid-row: 2;
    grid-column:1/2;
    background-color: #71ba7a;
`


import React from 'react';
import styled from 'styled-components';

import { SelectForm } from './SelectForm';
import { Post } from './Post';

export default () => {
    // const viewStore = useContext<ViewStore>(viewStoreContext);
    // const { tagStore, postStore } = viewStore;
    return (
        <StyledPostMain>
            <SelectForm />
            <Post />
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


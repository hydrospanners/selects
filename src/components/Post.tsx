import { observer } from 'mobx-react-lite';
import React from 'react';
import { useContext } from 'react';
import styled from 'styled-components';

import viewStoreContext, { PostStore, ViewStore } from '../store/ViewStore';
import { Window } from './Window'

export const Post = observer(() => {
    const { postStore }: {
        postStore: PostStore;
    } = useContext<ViewStore>(viewStoreContext);
    return (<StyledPost>
        {postStore && postStore.selectedPost && <div>
            {postStore.selectedPost.title}
        </div>}
    </StyledPost>);
});


const StyledPost = styled(Window)`
    grid-row:1; 
    grid-column:2/3;

    background-color: purple;
    color: #fff; 
`;

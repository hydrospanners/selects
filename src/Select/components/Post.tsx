import { observer } from 'mobx-react-lite';
import React from 'react';
import { useContext } from 'react';
import styled from 'styled-components';

import { Window } from '../../components/Window';
import { PostStore } from './../store/PostStore';
import viewStoreContext, { ViewStore } from './../store/SelectViewStore';

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

import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import styled from 'styled-components';

import { Window } from '../../components/Window';
import ViewStoreContext, { ViewStore } from '../store/SelectViewStore';

export const ViewHistory = observer(() => {
    const store = useContext<ViewStore>(ViewStoreContext);
    return (
        <StyledEmptyWindow>
            {store.viewHistory.slice(0).reverse().map((h, i) => <p key={`${i}:${h.tag}/${h.post}`} >{`${h.tag}/${h.post}`}</p>)}
        </StyledEmptyWindow>
    );
});

export const StyledEmptyWindow = styled(Window)`
    grid-row: 2;
    grid-column:1/2;
    background-color: #71ba7a;
    font-size:12px;
`

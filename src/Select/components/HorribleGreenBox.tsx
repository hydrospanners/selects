import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { StyledEmptyWindow } from '../index';
import ViewStoreContext, { ViewStore } from '../store/SelectViewStore';

export const HorribleGreenBox = observer(() => {
    const store = useContext<ViewStore>(ViewStoreContext);
    return (
        <StyledEmptyWindow>
            {store.viewHistory.reverse().map((h, i) => <p key={`${i}:${h.tag}/${h.post}`} >{`${h.tag}/${h.post}`}</p>)}
        </StyledEmptyWindow>
    );
});

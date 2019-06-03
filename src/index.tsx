import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { render } from 'react-dom';

import { SelectForm } from './components/SelectForm';
import { PostStore } from './store/PostStore';
import viewStoreContext, { ViewStore } from './store/ViewStore';
import { TagStore } from './store/TagStore';


const App = observer(() => {

    const viewStore = useContext<ViewStore>(viewStoreContext);



    return (
        <>
            <SelectForm />
        </>
    )
})


render(
    <App />,
    document.getElementById('root'));
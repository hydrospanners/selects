import React, { useState } from 'react';
import { render } from 'react-dom';
import { Formik, Form, ErrorMessage, Field } from 'formik'
import * as Yup from 'yup';

class Side {
    name: string;
    characters: string[];
}

const darkSide = new Side();
darkSide.name = 'dark side';
darkSide.characters = ['Palpatine', 'Vader', 'Maul'];
const lightSide = new Side();
lightSide.name = 'light side';
lightSide.characters = ['Obi-Wan', 'Yoda', 'Luke'];


const App = () => {
    const sides = [darkSide, lightSide];

    const [selectedSide, setSelectedSide] = useState();
    const [selectedCharacter, setSelectedCharacter] = useState('');
    const validationSchema = Yup.object().shape({
        side: Yup.string().required(),
        character: Yup.string().required()
    })
    return (
        <Formik
            onSubmit={(values) => { console.log(values) }}
            initialValues={{ side: '', character: '' }}
            validationSchema={validationSchema}
            render={props => (

                <Form>
                    <Field name="side"
                        component="select"
                        placeholder="pick one side"
                        onChange={e => {
                            setSelectedSide(sides.find(side => side.name == e.target.value))
                            setSelectedCharacter(null);
                            props.handleChange(e);
                        }}
                    >
                        <option>chose a side</option>
                        {sides.map(side => <option key={`side:${side.name}`} value={side.name}>{side.name}</option>)}
                    </Field>
                    <ErrorMessage name="side" />
                    {selectedSide != null && <div>
                        <Field name="character" component="select" onChange={e => {
                            setSelectedCharacter(e.target.value);
                            props.handleChange(e);
                        }}>
                            <option value="">chose a character</option>
                            {sides.find(side => side == selectedSide).characters.map(character => <option key={`character:${character}`} value={character}>{character}</option>)}
                        </Field>
                        <ErrorMessage name="character" />
                    </div>}
                    {selectedSide != null && <div>
                        {selectedSide.name}
                    </div>}
                    {selectedCharacter != '' && <div>
                        {selectedCharacter}
                    </div>}
                    <button type="submit">Save</button>
                </Form>
            )}
        />
    )
}


render(
    <App />,
    document.getElementById('root'));
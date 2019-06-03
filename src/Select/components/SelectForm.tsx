import { ErrorMessage, Field, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import { Window } from '../../components/Window';
import { PostStore } from './../store/PostStore';
import viewStoreContext, { ViewStore } from './../store/SelectViewStore';
import { TagStore } from './../store/TagStore';


export const SelectForm = observer(() => {
    const store = useContext<ViewStore>(viewStoreContext);
    const { postStore, tagStore }: { postStore: PostStore; tagStore: TagStore; } = store;

    useEffect(() => {
        // mobx only rerenders if item is directly accessed. Not through for example .map. 
    }, [tagStore.tags])

    const onSubmit = ({ tag, post }) => {
        store.celebrateAndResetForms(tag, post)
    };

    // Simple validation rule, both values are required strings
    const validationSchema = Yup.object().shape({
        tag: Yup.string().required(),
        post: Yup.string().required()
    });

    const initialValues = {
        tag: '',
        post: ''
    }

    return (
        <StyledFormik>
            <Formik
                onSubmit={onSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
                render={props => {
                    store.resetForm = props.resetForm;
                    return (<StyledForm>
                        <div className="top">
                            <Field name="tag" component="select" placeholder="pick one side" onChange={(event: { target: { value: string; }; }) => {
                                tagStore.setSelectedTag(event.target.value);
                                props.handleChange(event);
                            }}>
                                <option>Chose tag</option>
                                {tagStore.tags.map(tag => <option key={`tag:${tag.slug}`} value={tag.slug}>{tag.name}</option>)}
                            </Field>
                            <ErrorMessage name="tag" >{msg => <div className="validation-error">{msg}</div>}</ErrorMessage>

                            {postStore && <div>
                                <Field name="post" component="select" onChange={e => {
                                    postStore.setSelectedPost(e.target.value);
                                    props.handleChange(e);
                                }}>
                                    <option value="">Chose post</option>
                                    {postStore.posts.map(post => <option key={`post:${post.slug}`} value={post.slug}>{post.title}</option>)}
                                </Field>
                                <ErrorMessage name="post" >{msg => <div className="validation-error">{msg}</div>}</ErrorMessage>
                            </div>}
                        </div>

                        <div className="bottom">
                            <button disabled={!props.isValid} type="submit">View Post</button>
                        </div>

                    </StyledForm>)
                }}
            />
        </StyledFormik>);
});

const StyledFormik = styled(Window)`
    grid-row:1; 
    grid-column:1/2;
`;

const StyledForm = styled(Form)`
    height: 100%; 
    display: flex;
    flex-direction:column; 

    .top {
        flex-grow: 1; 
    }

    .bottom {
        button {
            float:right;
        }
    }

    .validation-error {
        color:#fff;
        font-size:0.8em; 
        &:before {
            content: '*';
            padding-right: 0.5em; 
            color: red; 
        }
    }

    /* credit: https://css-tricks.com/styling-a-select-like-its-2019/*/
    select,button[type="submit"] {
        display: block;
        font-family: 'Roboto', sans-serif;
        font-size: 1em;
        font-weight: 700;
        line-height: 1.3;
        padding: .6em 1.4em .5em .8em;
        max-width: 100%; 
        box-sizing: border-box;
        margin: 0;
        border: 1px solid #aaa;
        box-shadow: 0 1px 0 1px rgba(0,0,0,.04);
        border-radius: .5em;
        -moz-appearance: none;
        -webkit-appearance: none;
        appearance: none;
        background-color: #fff;
    }

    select{
        background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'), linear-gradient(to bottom, #ffffff 0%,#e5e5e5 100%);
        background-repeat: no-repeat, repeat;
        background-position: right .7em top 50%, 0 0;
        background-size: .65em auto, 100%;
    }

    button:disabled {
        color: #ddd; 
    }
     
    select::-ms-expand {
        display: none;
    }
    select:hover {
        border-color: #888;
    }
    select:focus {
        border-color: #aaa;
        box-shadow: 0 0 1px 3px rgba(59, 153, 252, .7);
        box-shadow: 0 0 0 3px -moz-mac-focusring;
        color: #222; 
        outline: none;
    }
    select option {
        font-weight:normal;
    }
`;


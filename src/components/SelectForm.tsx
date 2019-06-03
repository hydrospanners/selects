import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useContext, useEffect } from 'react';
import * as Yup from 'yup';

import { PostStore } from '../store/PostStore';
import viewStoreContext, { ViewStore } from '../store/ViewStore';
import { TagStore } from '../store/TagStore';
import { observer } from 'mobx-react-lite';

export const SelectForm = observer(() => {
    const { postStore, tagStore }: { postStore: PostStore; tagStore: TagStore; } = useContext<ViewStore>(viewStoreContext);

    useEffect(() => {
        // mobx only rerenders if item is directly accessed. Not through for example .map. 
    }, [tagStore.tags])

    const onSubmit = ({ post, tag }) => {
        // Not sure what to do here for now
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

    return <Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={validationSchema}
        render={props =>
            (<Form>
                <Field name="tag" component="select" placeholder="pick one side" onChange={(event: { target: { value: string; }; }) => {
                    tagStore.setSelectedTag(event.target.value);
                    props.handleChange(event);
                }}>
                    <option>Chose tag</option>
                    {tagStore.tags.map(tag => <option key={`tag:${tag.slug}`} value={tag.slug}>{tag.name}</option>)}
                </Field>
                <ErrorMessage name="tag" />
                {postStore && <div>
                    <Field name="post" component="select" onChange={e => {
                        postStore.setSelectedPost(e.target.value);
                        props.handleChange(e);
                    }}>
                        <option value="">Chose post</option>
                        {postStore.posts.map(post => <option key={`post:${post.slug}`} value={post.slug}>{post.title}</option>)}
                    </Field>
                    <ErrorMessage name="post" />
                </div>}
                <button disabled={!props.isValid} type="submit">Submit</button>
            </Form>)}
    />;
});

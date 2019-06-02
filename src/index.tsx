import { response } from 'express';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState, useContext } from 'react';
import { render } from 'react-dom';
import * as Yup from 'yup';
import viewStoreContext, { ViewStore } from './store';
import { observer } from 'mobx-react-lite'


const App = observer(() => {
    const [fetchedPost, setPost] = useState();

    const { tagAndPostStore } = useContext<ViewStore>(viewStoreContext);

    const validationSchema = Yup.object().shape({
        tag: Yup.string().required(),
        post: Yup.string().required()
    })

    useEffect(() => {
        // do updates to the component if these values change
    },[tagAndPostStore.tags, tagAndPostStore.posts])
    

    const fetchPost = ({ post, tag }) => {
        tagAndPostStore.fetchPost(post);
    }

    return (
        <>
            <Formik
                onSubmit={fetchPost}
                initialValues={{
                    tag: '',
                    post: ''
                }}
                validationSchema={validationSchema}
                render={props => (
                    <Form>
                        <Field name="tag"
                            component="select"
                            placeholder="pick one side"
                            onChange={e => {
                                tagAndPostStore.selectedTag = tagAndPostStore.tags.find(tag => tag.slug == e.target.value)
                                props.handleChange(e);
                            }}
                        >
                            <option>chose a tag</option>
                            {tagAndPostStore.tags.map(tag => <option key={`tag:${tag.slug}`} value={tag.slug}>{tag.name}</option>)}
                        </Field>
                        <ErrorMessage name="tag" />
                        {tagAndPostStore.selectedTag && <div>
                            <Field name="post" component="select" onChange={e => {
                                props.handleChange(e);
                            }}>
                                <option value="">chose a post</option>
                                {tagAndPostStore.posts.map(post => <option key={`post:${post.slug}`} value={post.slug}>{post.title}</option>)}
                            </Field>
                            <ErrorMessage name="post" />
                        </div>}
                        <button disabled={!props.isValid} type="submit">get</button>
                    </Form>
                )}
            />
            {tagAndPostStore.selectedTag && <div>
                {tagAndPostStore.selectedTag.name}
            </div>}
            
            {tagAndPostStore.selectedPost && <div>
                <div>
                    {tagAndPostStore.selectedPost.title}
                </div>
                <div dangerouslySetInnerHTML={{ __html: tagAndPostStore.selectedPost.body }}></div>
            </div>}
        </>
    )
})


render(
    <App />,
    document.getElementById('root'));
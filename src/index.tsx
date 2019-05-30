import { response } from 'express';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import * as Yup from 'yup';


const App = () => {
    const [tags, setTags] = useState([]);
    const [posts, setPosts] = useState([]);
    const [post, setPost] = useState();

    const [selectedTag, setSelectedTag] = useState();
    const [selectedPost, setSelectedPost] = useState();
    const validationSchema = Yup.object().shape({
        tag: Yup.string().required(),
        post: Yup.string().required()
    })
    useEffect(() => {
        // on mount load from the api
        fetch('/api/tag')
            .then(response => response.json())
            .then(({ data }: { data: { data: any } }) => {
                setTags(data.data)
            })
    }, [])
    useEffect(() => {
        if (selectedTag != null) {
            fetch('api/tag/' + selectedTag.slug)
                .then(response => response.json())
                .then(({ data }: { data: { data: any } }) => {
                    setPosts(data.data);
                })
        }
    }, [selectedTag])

    const getPost = ({ post }) => {
        fetch('api/post/' + post)
            .then(response => response.json())
            .then(({ data }: { data: { data: any } }) => {
                setPost(data.data);
            })
    }

    return (
        <>
            <Formik
                onSubmit={getPost}
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
                                setSelectedTag(tags.find(category => category.slug == e.target.value))
                                setSelectedPost(null);
                                props.handleChange(e);
                            }}
                        >
                            <option>chose a tag</option>
                            {tags.map(category => <option key={`tag:${category.slug}`} value={category.slug}>{category.name}</option>)}
                        </Field>
                        <ErrorMessage name="tag" />
                        {selectedTag && <div>
                            <Field name="post" component="select" onChange={e => {
                                setSelectedPost(posts.find(post => post.slug == e.target.value));
                                props.handleChange(e);
                            }}>
                                <option value="">chose a post</option>
                                {posts.map(post => <option key={`post:${post.slug}`} value={post.slug}>{post.title}</option>)}
                            </Field>
                            <ErrorMessage name="post" />
                        </div>}
                        <button disabled={!props.isValid} type="submit">get</button>
                    </Form>
                )}
            />
            {selectedTag && <div>
                {selectedTag.name}
            </div>}
            {selectedPost && <div>
                {selectedPost.title}
            </div>}
            {post && <div>
                <div>
                    {post.title}
                </div>
                <div>{post.body}</div>
            </div>}
        </>
    )
}


render(
    <App />,
    document.getElementById('root'));
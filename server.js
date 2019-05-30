const dotenv = require('dotenv');
dotenv.config();
const Butter = require('buttercms')
const butter = Butter(process.env.app_key);
const express = require('express');
const app = express()

app.listen(5000)

app.get('/tag/:tagSlug', (req, res) => {
    butter.post.list({ tag_slug: req.params.tagSlug })
        .then((response) => {
            res.json(response)
        }).then((error) => {
            res.json(error);
        })

})

app.get('/tag', (req, res) => {
    butter.tag.list()
        .then((response) => {
            res.json(response)
        }).catch((error) => {

            res.json(error);
        })
})
app.get('/post/:slug', (req, res) => {
    butter.post.retrieve(req.params.slug)
        .then((response) => {
            res.json(response)
        }).catch((error) => {

            res.json(error);
        })
})


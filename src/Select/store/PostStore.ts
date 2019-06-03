import { action, autorun, observable } from 'mobx';

import { Post } from './Post';
import { ViewStore } from './SelectViewStore';

export class PostStore {
    constructor(private viewStore: ViewStore, private selectedTagSlug: string) { }

    @observable posts: Post[] = [];
    // This runs on creation and does an async fetch to the api to get the posts by tag.slug
    private disposer = autorun(async () => {
        const response = await fetch(`/api/tag/${this.selectedTagSlug}`);
        const json = await response.json();
        this.posts = json.data.data.map(p => new Post(this, p));
    });

    @action.bound
    setSelectedPost(slug: string) {
        this.selectedPost = this.posts.find(p => p.slug == slug);
    }
    // to protect my self, this should perhaps be a computed get property. so i don't accidentally assign value to the property directly. 
    // Or use the suggested 'strict' mode so that only actions can mutate state. I'm not quite there yet though. 
    @observable selectedPost: Post;


    updatePost(postToUpdate: Post) {
        //  Talk to service and do some update. Mobx also has some auto updating functions, not sure about those yet. 
        throw new Error("Method not implemented.");
    }
}

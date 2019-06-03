import { action, autorun, observable } from 'mobx';

import { Post } from './Post';
import { ViewStore } from './ViewStore';

export class PostStore {
    constructor(private viewStore: ViewStore, private selectedTagSlug: string) { }
    
    @observable posts: Post[] = [];
    // i don't need to use this disposer, but let's say it was a webSocket or something i could use this method to gracfully close connections perhaps
    private disposer = autorun(async () => {
        const response = await fetch(`api/tag/${this.selectedTagSlug}`);
        const json = await response.json();
        this.posts = json.data.data;
    });

    @action.bound
    setSelectedPost(slug: string) {
        this.selectedPost = this.posts.find(p => p.slug == slug);
    }
    // to protect my self, this should perhaps be a computed get property. so i don't accidentally assign value to the property directly. 
    // Or use the suggested 'strict' mode so that only actions can mutate state. I'm not quite there yet though. 
    @observable selectedPost: Post;
}

import { observable, computed, reaction } from 'mobx'
import { createContext } from 'react';
import { promisedComputed } from 'computed-async-mobx'


class Tag {
    slug: string;
    name: string;
}
class Post {
    slug: string;
    title: string;
    body: string;
}

class TagAndPostStore {
    constructor(private viewStore) {
        this.loadInitialTags();

    }

    @observable selectedTag: Tag;
    @observable selectedPost: Post;

    @observable tags: Tag[] = [];
    @observable posts: Post[] = [];



    private async loadInitialTags() {
        const response = await fetch('/api/tag');
        const json = await response.json();
        this.tags = json.data.data;
    }

    // selecting a tag will auto update the posts available
    private postsReaction = reaction(() => this.selectedTag, async (selectedTag) => {
        this.selectedPost = undefined;
        if(selectedTag == undefined){
            this.posts = [];
            return;
        }
        const response = await fetch(`api/tag/${selectedTag.slug}`);
        const json = await response.json();
        this.posts = json.data.data;
    })


    async fetchPost(postSlug: string):Promise<void> {
        const response = await fetch(`api/post/${postSlug}`)
        const json = await response.json();
        this.selectedPost = json.data.data; 
    }
}

class ViewStore {
    tagAndPostStore: TagAndPostStore;

    // To get circle reference if needed 
    static Create(): ViewStore {
        const ret = new ViewStore();
        ret.tagAndPostStore = new TagAndPostStore(ret);
        return ret;
    }

}

// export the classes for type safe reasons
export { ViewStore, Post, Tag, TagAndPostStore }

// Creates context to be used by other classes
export default createContext(ViewStore.Create());
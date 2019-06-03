import { observable } from 'mobx';
import { createContext } from 'react';

import { Post } from './Post';
import { PostStore } from './PostStore';
import { Tag } from './Tag';
import { TagStore } from './TagStore';


class ViewStore {
    @observable postStore: PostStore;
    tagStore: TagStore; // the object itself does not need 

    createTagStore(tag: string) {
        this.postStore = new PostStore(this, tag);
    }

    static Create(): ViewStore {
        const ret = new ViewStore();
        ret.tagStore = new TagStore(ret);
        return ret;
    }
}

export { ViewStore, Post, Tag, PostStore, TagStore }
export default createContext(ViewStore.Create());
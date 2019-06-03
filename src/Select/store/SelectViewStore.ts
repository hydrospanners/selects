import { observable } from 'mobx';
import { createContext } from 'react';

import { Post } from './Post';
import { PostStore } from './PostStore';
import { Tag } from './Tag';
import { TagStore } from './TagStore';


class ViewStore {
    resetForm: () => void;
    celebrateAndResetForms(tag: string, post: string) {

        this.resetForm();
        this.tagStore.setSelectedTag('');
        this.viewHistory.push({ tag, post })
    }
    @observable viewHistory: { tag: string, post: string }[] = [];

    @observable postStore: PostStore;
    tagStore: TagStore; // the object itself does not need to be observable

    createTagStore(tag: string) {
        if (tag == '') {
            this.postStore = undefined;
            return;
        }
        this.postStore = new PostStore(this, tag);
    }

    static Create(): ViewStore {
        const ret = new ViewStore();
        ret.tagStore = new TagStore(ret);
        return ret;
    }


}

export { ViewStore }
export default createContext(ViewStore.Create());
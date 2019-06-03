import { observable } from 'mobx';
import { createContext } from 'react';

import { Post } from './Post';
import { PostStore } from './PostStore';
import { Tag } from './Tag';
import { TagStore } from './TagStore';


class ViewStore {
    resetForm: () => void;
    celebrateAndResetForms(tag: string, post: string) {

        // Not quite sure about this... Feels funny to pass the reset form function back to the store.
        this.resetForm();

        // send magic string '' to reset 
        this.tagStore.setSelectedTag('');

        // just to show that the submit button works really. 
        this.viewHistory.push({ tag, post })
    }
    
    tagStore: TagStore; // the object itself does not need to be observable
    @observable postStore: PostStore; // but this one does since we are watching it's state if it's undefined or not in the components. 
    

    // When a tag has been selected, we need to set the post store to show relevant posts. 
    createPostStore(tag: string) {
        if (tag == '') {
            this.postStore = undefined;
            return;
        }
        this.postStore = new PostStore(this, tag);
    }
    
    @observable viewHistory: { tag: string, post: string }[] = [];


    // Since we want a circle reference, we need to create the ViewStore object first and then send it as a parameter to the TagStore object. 
    static Create(): ViewStore {
        const ret = new ViewStore();
        ret.tagStore = new TagStore(ret);
        return ret;
    }
}

// Export the type
export { ViewStore }
// Export the context instance. 
export default createContext(ViewStore.Create());
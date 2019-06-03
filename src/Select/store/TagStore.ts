import { autorun, observable } from 'mobx';

import { ViewStore } from './SelectViewStore';
import { Tag } from './Tag';

export class TagStore {
    constructor(private viewStore: ViewStore) { }

    @observable tags: Tag[] = [];
    private disposer = autorun(() => this.fetchTags());
    private async fetchTags() {
        const response = await fetch('/api/tag');
        const json = await response.json();
        this.tags = json.data.data;
    }
    
    setSelectedTag(tagSlug: string) {
        // when a tag has been selected, the post store can be initated by the view store. 
        this.viewStore.createPostStore(tagSlug);
    }
}

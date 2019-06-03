import { observable, autorun } from 'mobx';
import { Tag } from './Tag';
import { ViewStore } from './ViewStore';
export class TagStore {
    constructor(private viewStore: ViewStore) {
    }
    @observable
    tags: Tag[] = [];
    private async fetchTags() {
        const response = await fetch('/api/tag');
        const json = await response.json();
        this.tags = json.data.data;
    }
    private disposer = autorun(() => this.fetchTags());
    setSelectedTag(tagSlug: string) {
        this.viewStore.createTagStore(tagSlug);
    }
}

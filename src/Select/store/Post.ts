import { PostStore } from "./PostStore";

export class Post {
    constructor(private store: PostStore, { slug, title, body }: { slug: string, title: string, body: string }) {
        this.slug = slug; 
        this.body = body; 
        this.title = title; 
        // I'd want to do some kind of auto mapper here 
    }
    slug: string;
    title: string;
    body: string;

    // the point is to let the class do it's own updateing in the future
    // perhaps 
    updateTitle(newTitle:string) {
        this.title = newTitle;
        this.store.updatePost(this);
    }
}

import { getCollection } from "astro:content";

export const getPosts = async () => 
    (await getCollection('blog')).sort(
        (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
    )
import { getCollection } from "astro:content";

export const getPosts = async () => 
    (await getCollection('blog')).filter((data) => data.data.published === true).sort(
        (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
    )
import Fuse from "fuse.js";


export function fuseSearch<T>(searchArray:T[], userInput:string): T[]{
    const fuse = new Fuse(searchArray, {
        distance: 100,
        includeScore: true,
        keys: ["searchable"],
        location: 0,
        minMatchCharLength: 1,
        shouldSort: true,
        threshold: 0.6,
    });
    const search = fuse.search(userInput) as any[];
    return search;
}

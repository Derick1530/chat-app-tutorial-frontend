export function handle(state:any,action:any) {
    if(action.input.function === "initialized") {
        state.author = action.caller
    } 
    if(action.input.function === "createPost" && state.author === action.caller) {
        const posts  =state.posts
        posts[action.input.post.id] = action.input.post
        state.posts = posts 

    } 
    if(action.input.function === "updatePost" && state.author === action.caller) {
        const posts  =state.posts
        const postToUpdate = action.input.post
        posts[postToUpdate.id] = postToUpdate
        state.posts = posts 

    } 

if(action.input.function === "deletePost" && state.author === action.caller) {
    const posts  =state.posts
    delete posts[action.input.post.id]
    state.posts = posts 

} 

return {
    state
}
}
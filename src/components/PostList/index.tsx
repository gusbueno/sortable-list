import { useEffect, useState } from "react"

import { useSortablePosts } from "../../hooks/useSortablePosts"

export const PostList = () => {
    const [isLoading, setIsLoading] = useState(true)
    const { setInitialListOrder, currentListOrder } = useSortablePosts()

    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true)
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts')
                const posts = await response.json()

                console.log({ posts: posts.slice(0, 5) })
                setInitialListOrder(posts.slice(0, 5))
                setIsLoading(false)
            } catch (error) {
                console.log(error)
                setIsLoading(false)
            }
        }
        fetchPosts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    console.log({ currentListOrder, isLoading })
    return (
        <div>Sortable list</div>
    )
}
import { useEffect, useState } from "react"

import { useSortablePosts } from "../../hooks/useSortablePosts"
import { PostItem } from "./components/PostItem"

export const PostList = () => {
    const [isLoading, setIsLoading] = useState(true)
    const { setInitialListOrder, currentListOrder } = useSortablePosts()

    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true)
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts')
                const posts = await response.json()

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

    return (
        <div>
            <span className="text-lg text-white">Sortable Post List</span>
            {isLoading ? (
                <span>Loading...</span>
            ) : (
                <div className="flex flex-col mt-4 gap-4">
                    {currentListOrder.map((postId, i) => {
                        const isFirst = i === 0
                        const isLast = i === currentListOrder.length - 1
                        return (
                            <PostItem
                                key={postId}
                                postId={postId}
                                isFirst={isFirst}
                                isLast={isLast}
                                currentPosition={i}
                            />
                        )
                    })}
                </div>
            )}
        </div>
    )
}
import { useCallback } from "react"

import { useSortablePosts } from "../../../../hooks/useSortablePosts"

type ActionItemProps = {
    actionId: string;
    postId: number;
    prevPosition: number;
    currentPosition: number;
}

export const ActionItem = ({ actionId, postId, prevPosition, currentPosition }: ActionItemProps) => {
    const { handleTimeTravel } = useSortablePosts()

    const handleOnClickTimeTravel = useCallback(() => {
        handleTimeTravel(actionId)
    }, [actionId, handleTimeTravel])

    return (
        <div className="flex justify-between items-center p-2 bg-white first:rounded-t last:rounded-b shadow-lg border-b last:border-b-0">
            <span className="text-sm">
                Moved post {postId} from index {prevPosition} to index {currentPosition}
            </span>
            <button
                onClick={handleOnClickTimeTravel}
                className="px-3 py-2 rounded bg-green-300 text-black text-sm hover:cursor-pointer hover:bg-green-400"
            >
                Time travel
            </button>
        </div>
    )
}
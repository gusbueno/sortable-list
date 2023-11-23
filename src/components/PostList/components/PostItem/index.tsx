import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid"
import { twMerge } from "tailwind-merge"

import { useSortablePosts } from "../../../../hooks/useSortablePosts";
import { useCallback } from "react";

type PostItemProps = {
    postId: number;
    isFirst: boolean;
    isLast: boolean;
    currentPosition: number;
}

export const PostItem = ({ postId, isFirst, isLast, currentPosition }: PostItemProps) => {
    const { updateListOrder, addAction } = useSortablePosts()

    const handleOnclick = useCallback((nextPosition: number) => () => {
        updateListOrder(currentPosition, nextPosition)
        addAction({
            postId,
            prevPosition: currentPosition,
            currentPosition: nextPosition,
        })
    }, [addAction, currentPosition, postId, updateListOrder])

    return (
        <div className="flex justify-between items-center p-2 bg-white rounded w-[300px] h-16">
            <span>Post {postId}</span>

            <div className={twMerge("flex flex-col h-full justify-between", (isFirst || isLast) && "justify-center")}>
                {!isFirst && (
                    <ChevronUpIcon
                        className="w-3 h-3 text-black hover:cursor-pointer"
                        onClick={handleOnclick(currentPosition - 1)}
                    />
                )}

                {!isLast && (
                    <ChevronDownIcon
                        className="w-3 h-3 text-black hover:cursor-pointer"
                        onClick={handleOnclick(currentPosition + 1)}
                    />
                )}

            </div>
        </div>
    )
}
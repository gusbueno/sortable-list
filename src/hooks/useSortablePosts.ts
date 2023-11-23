import { useContext } from 'react'

import {SortablePostsContext } from '../providers/SortablePostsProvider';

export const useSortablePosts = () => {
    const context = useContext(SortablePostsContext)

    if (!Object.keys(context).length) {
		throw new Error('Consumer needs to be wrapped a SortablePostsProvider')
	}

    return context
}
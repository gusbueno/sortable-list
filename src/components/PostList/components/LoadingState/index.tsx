export const LoadingState = () => (
    <div className="flex flex-col animate-pulse gap-4 mt-4" data-testid="postlist_loadingstate">
        {[...Array(5)].map((_, i) => (
            <div key={i} className="w-[300px] h-16 rounded bg-white" />
        ))}
    </div>
)
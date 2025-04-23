import EmptyState from ".";

const NoSavedBlogs = () => (
    <EmptyState
        icon="🔖"
        title="No Saved Blogs"
        messages={[
            "You haven't saved any blogs for later.",
            "💡 Found something interesting? Just hit the save icon to bookmark it!",
            "📚 Your saved reads will show up here.",
            "Happy exploring!"
        ]}
    />
);

export default NoSavedBlogs;
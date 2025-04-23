import EmptyState from ".";

const NoLikedBlogs = () => (
    <EmptyState
        icon="❤️"
        title="No Liked Blogs"
        messages={[
            "You haven’t liked any blogs yet.",
            "👍 Show some love to your favorite reads by hitting that like button!",
            "🔥 Liked blogs will be saved here for easy access.",
            "Keep reading and let us know what you love!"
        ]}
    />
);

export default NoLikedBlogs;
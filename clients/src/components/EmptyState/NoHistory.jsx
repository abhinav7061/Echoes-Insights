import EmptyState from ".";

const NoHistory = () => (
    <EmptyState
        icon="📭"
        title="No Reading History Yet"
        messages={[
            "Looks like you haven’t explored any blogs yet.",
            "🚀 Dive into something new and start building your reading streak!",
            "🧠 Discover fresh insights from our latest blog posts.",
            "📚 Happy reading!"
        ]}
    />
);

export default NoHistory;
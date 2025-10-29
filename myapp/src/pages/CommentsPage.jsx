import CommentsLive from "../CommentsLive";
import "./CommentsPage.css";

export default function CommentsPage() {
  return (
    <div className="comments-page">
      <h1 className="comments-title">💭 Real-time Comments</h1>
      <p className="comments-subtitle">
        Join the conversation with instant community feedback.
      </p>
      <CommentsLive />
    </div>
  );
}

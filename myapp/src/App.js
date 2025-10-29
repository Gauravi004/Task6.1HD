import { Routes, Route } from "react-router-dom";

// Main pages
import Home from "./Home";
import Login from "./Login";
import SignUp from "./Signup";
import Article from "./abstract";
import Desc from "./Desc";
import SignOut from "./Sigout";
import Plans from "./Plans";
import Post from "./Post";
import PaymentPage from "./Payment";

// Feature-specific wrapper pages
import AssistantPage from "./pages/AssistantPage";
import TwoFactorPage from "./pages/TwoFactorPage";
import VideoGalleryPage from "./pages/VideoGalleryPage";
import CommentsPage from "./pages/CommentsPage";

// 404 fallback component (optional to extract)
const NotFound = () => <h2 style={{ textAlign: "center", marginTop: "50px" }}>404 - Page Not Found</h2>;

export default function App() {
  return (
    <Routes>
      {/* Main navigation routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/plans" element={<Plans />} />
      <Route path="/article" element={<Article />} />
      <Route path="/description" element={<Desc />} />
      <Route path="/signout" element={<SignOut />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/post" element={<Post />} />

      {/* Feature routes */}
      <Route path="/assistant" element={<AssistantPage />} />
      <Route path="/2fa" element={<TwoFactorPage />} />
      <Route path="/video-gallery" element={<VideoGalleryPage />} />
      <Route path="/comments" element={<CommentsPage />} />

      {/* Catch-all 404 route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

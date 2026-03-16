import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import CreatePostPage from "./pages/CreatePostPage";
import EditPostPage from "./pages/EditPostPage";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import PostPage from "./pages/PostPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/posts" element={<HomePage />} />
          <Route path="/posts/new" element={<CreatePostPage />} />
          <Route path="/posts/:id" element={<PostPage />} />
          <Route path="/posts/:id/edit" element={<EditPostPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

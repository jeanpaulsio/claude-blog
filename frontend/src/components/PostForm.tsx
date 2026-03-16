import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Editor from "./Editor";

interface Props {
  initialValues?: { title: string; content: string };
  onSubmit: (data: { title: string; content: string }) => void;
  submitLabel?: string;
}

export default function PostForm({
  initialValues,
  onSubmit,
  submitLabel = "Save",
}: Props) {
  const navigate = useNavigate();
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [content, setContent] = useState(initialValues?.content ?? "");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError("Title and content are required.");
      return;
    }
    setError("");
    onSubmit({ title: title.trim(), content: content.trim() });
  }

  return (
    <form onSubmit={handleSubmit} className="form-container">
      {error && <p className="form-error">{error}</p>}
      <div className="form-group">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-input"
          placeholder="Give your post a title"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Content</label>
        <Editor content={content} onChange={setContent} />
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {submitLabel}
        </button>
        <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>
          Cancel
        </button>
      </div>
    </form>
  );
}

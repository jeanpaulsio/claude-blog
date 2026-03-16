import { useState } from "react";
import Markdown from "react-markdown";
import { useNavigate } from "react-router-dom";

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
  const [showPreview, setShowPreview] = useState(false);

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
        <div className="editor-header">
          <label htmlFor="content" className="form-label" style={{ margin: 0 }}>
            Content
          </label>
          <div className="editor-tabs">
            <button
              type="button"
              className={`editor-tab ${!showPreview ? "editor-tab-active" : ""}`}
              onClick={() => setShowPreview(false)}
            >
              Write
            </button>
            <button
              type="button"
              className={`editor-tab ${showPreview ? "editor-tab-active" : ""}`}
              onClick={() => setShowPreview(true)}
            >
              Preview
            </button>
          </div>
        </div>
        {showPreview ? (
          <div className="editor-preview prose">
            {content.trim() ? (
              <Markdown>{content}</Markdown>
            ) : (
              <p className="editor-preview-empty">Nothing to preview yet.</p>
            )}
          </div>
        ) : (
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-textarea"
            placeholder="Write in Markdown... **bold**, *italic*, ## headings, `code`, > quotes"
          />
        )}
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

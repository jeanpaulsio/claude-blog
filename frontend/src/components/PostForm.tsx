import { useState } from "react";

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
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="title" style={{ display: "block", marginBottom: 4 }}>
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%", padding: "0.5rem", boxSizing: "border-box" }}
        />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="content" style={{ display: "block", marginBottom: 4 }}>
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          style={{ width: "100%", padding: "0.5rem", boxSizing: "border-box" }}
        />
      </div>
      <button type="submit">{submitLabel}</button>
    </form>
  );
}

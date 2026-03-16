import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { afterEach, describe, it, expect, vi } from "vitest";
import PostForm from "../src/components/PostForm";

afterEach(cleanup);

describe("PostForm", () => {
  it("renders title and content fields", () => {
    render(<PostForm onSubmit={() => {}} />);
    expect(screen.getByLabelText("Title")).toBeInTheDocument();
    expect(screen.getByLabelText("Content")).toBeInTheDocument();
  });

  it("shows error when submitting empty form", () => {
    render(<PostForm onSubmit={() => {}} />);
    fireEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(screen.getByText("Title and content are required.")).toBeInTheDocument();
  });

  it("calls onSubmit with form data", () => {
    const onSubmit = vi.fn();
    render(<PostForm onSubmit={onSubmit} />);

    fireEvent.change(screen.getByLabelText("Title"), {
      target: { value: "My Title" },
    });
    fireEvent.change(screen.getByLabelText("Content"), {
      target: { value: "My Content" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Save" }));

    expect(onSubmit).toHaveBeenCalledWith({
      title: "My Title",
      content: "My Content",
    });
  });

  it("pre-fills with initial values", () => {
    render(
      <PostForm
        initialValues={{ title: "Existing", content: "Body" }}
        onSubmit={() => {}}
      />
    );
    expect(screen.getByLabelText("Title")).toHaveValue("Existing");
    expect(screen.getByLabelText("Content")).toHaveValue("Body");
  });

  it("renders custom submit label", () => {
    render(<PostForm onSubmit={() => {}} submitLabel="Create" />);
    expect(screen.getByRole("button", { name: "Create" })).toBeInTheDocument();
  });
});

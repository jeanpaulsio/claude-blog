import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, it, expect, vi } from "vitest";
import PostForm from "../src/components/PostForm";

afterEach(cleanup);

function renderWithRouter(ui: React.ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe("PostForm", () => {
  it("renders title and content fields", () => {
    renderWithRouter(<PostForm onSubmit={() => {}} />);
    expect(screen.getByLabelText("Title")).toBeInTheDocument();
    expect(screen.getByLabelText("Content")).toBeInTheDocument();
  });

  it("shows error when submitting empty form", () => {
    renderWithRouter(<PostForm onSubmit={() => {}} />);
    fireEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(screen.getByText("Title and content are required.")).toBeInTheDocument();
  });

  it("calls onSubmit with form data", () => {
    const onSubmit = vi.fn();
    renderWithRouter(<PostForm onSubmit={onSubmit} />);

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
    renderWithRouter(
      <PostForm
        initialValues={{ title: "Existing", content: "Body" }}
        onSubmit={() => {}}
      />
    );
    expect(screen.getByLabelText("Title")).toHaveValue("Existing");
    expect(screen.getByLabelText("Content")).toHaveValue("Body");
  });

  it("renders custom submit label", () => {
    renderWithRouter(<PostForm onSubmit={() => {}} submitLabel="Create" />);
    expect(screen.getByRole("button", { name: "Create" })).toBeInTheDocument();
  });
});

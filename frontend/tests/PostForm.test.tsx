import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, it, expect, vi } from "vitest";
import PostForm from "../src/components/PostForm";

afterEach(cleanup);

function renderWithRouter(ui: React.ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe("PostForm", () => {
  it("renders title field and content label", () => {
    renderWithRouter(<PostForm onSubmit={() => {}} />);
    expect(screen.getByLabelText("Title")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("shows error when submitting with empty title", () => {
    renderWithRouter(<PostForm onSubmit={() => {}} />);
    fireEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(screen.getByText("Title and content are required.")).toBeInTheDocument();
  });

  it("renders custom submit label", () => {
    renderWithRouter(<PostForm onSubmit={() => {}} submitLabel="Create" />);
    expect(screen.getByRole("button", { name: "Create" })).toBeInTheDocument();
  });

  it("pre-fills title with initial values", () => {
    renderWithRouter(
      <PostForm
        initialValues={{ title: "Existing", content: "Body" }}
        onSubmit={() => {}}
      />
    );
    expect(screen.getByLabelText("Title")).toHaveValue("Existing");
  });

  it("has a cancel button", () => {
    renderWithRouter(<PostForm onSubmit={() => {}} />);
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
  });
});

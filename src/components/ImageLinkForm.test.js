import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ImageLinkForm from "./ImageLinkForm";

describe("ImageLinkForm Component", () => {
  test("renders the form with title, input, and button", () => {
    render(
      <ImageLinkForm onInputChange={jest.fn()} onButtonSubmit={jest.fn()} />
    );

    expect(
      screen.getByText(
        /This Magic Brain will detect face in your picture. Git it a try./i
      )
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /detect/i })).toBeInTheDocument();
  });

  test("calls onInputChange when input value changes", () => {
    const onInputChange = jest.fn();
    render(
      <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={jest.fn()} />
    );

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "new value" },
    });

    expect(onInputChange).toHaveBeenCalledTimes(1);
  });

  test("calls onButtonSubmit when button is clicked", () => {
    const onButtonSubmit = jest.fn();
    render(
      <ImageLinkForm
        onInputChange={jest.fn()}
        onButtonSubmit={onButtonSubmit}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /detect/i }));

    expect(onButtonSubmit).toHaveBeenCalledTimes(1);
  });
});

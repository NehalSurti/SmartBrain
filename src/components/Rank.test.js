import React from "react";
import { render, screen } from "@testing-library/react";
import Rank from "./Rank";

describe("Rank Component", () => {
  test("renders the name and entry count correctly", () => {
    const name = "John";
    const entries = 5;

    render(<Rank name={name} entries={entries} />);

    const titleElement = screen.getByText(
      /John, your current entry count is.../i
    );
    expect(titleElement).toBeInTheDocument();

    const valueElement = screen.getByText("5");
    expect(valueElement).toBeInTheDocument();
  });
});

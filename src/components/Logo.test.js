import React from "react";
import { render } from "@testing-library/react";
import "jest-styled-components";
import Logo from "./Logo";
import brain from "../assets/images/brain.png";

describe("Logo Component", () => {
  test("renders correctly", () => {
    const { getByAltText, container } = render(<Logo />);

    // Test for the image element
    const imgElement = getByAltText("logo");
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute("src", brain);

    // Test for styled-components styles
    expect(container.firstChild).toHaveStyleRule("position", "absolute");
    expect(container.firstChild).toHaveStyleRule("top", "20px");
    expect(container.firstChild).toHaveStyleRule("left", "20px");
    expect(container.firstChild).toHaveStyleRule("cursor", "pointer");
    expect(container.firstChild).toHaveStyleRule("z-index", "2");

    // Test for TiltWrapper styles
    const tiltWrapper = container.querySelector(".tiltWrapper");
    expect(tiltWrapper).toHaveStyleRule("display", "flex");
    expect(tiltWrapper).toHaveStyleRule("justify-content", "center");
    expect(tiltWrapper).toHaveStyleRule("align-items", "center");
    expect(tiltWrapper).toHaveStyleRule("width", "80px");
    expect(tiltWrapper).toHaveStyleRule("height", "80px");
    expect(tiltWrapper).toHaveStyleRule(
      "background",
      "linear-gradient(89deg, #ff5edf 0%, #04c8de 100%)"
    );
    expect(tiltWrapper).toHaveStyleRule("border-radius", "10px");
    expect(tiltWrapper).toHaveStyleRule(
      "box-shadow",
      "0 5px 15px rgba(0, 0, 0, 0.1)"
    );
  });
});

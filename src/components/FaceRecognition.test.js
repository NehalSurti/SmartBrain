import React from "react";
import { render, screen } from "@testing-library/react";
import FaceRecognition from "./FaceRecognition";

describe("FaceRecognition Component", () => {
  const mockBox = {
    topRow: 100,
    rightCol: 100,
    bottomRow: 100,
    leftCol: 100,
  };

  test("renders without crashing", () => {
    const { container } = render(
      <FaceRecognition imageUrl="http://example.com/image.jpg" box={mockBox} />
    );
    expect(container).toBeInTheDocument();
  });

  test("renders image with correct src and alt attributes", () => {
    render(
      <FaceRecognition imageUrl="http://example.com/image.jpg" box={mockBox} />
    );
    const image = screen.getByTestId("input-image");
    expect(image).toHaveAttribute("src", "http://example.com/image.jpg");
    expect(image).toHaveAttribute("alt", "");
  });

  test("renders bounding box with correct styles", () => {
    render(
      <FaceRecognition imageUrl="http://example.com/image.jpg" box={mockBox} />
    );
    const boundingBox = screen.getByTestId("Bounding-Box");
    expect(boundingBox).toHaveStyle(`top: ${mockBox.topRow}px`);
    expect(boundingBox).toHaveStyle(`right: ${mockBox.rightCol}px`);
    expect(boundingBox).toHaveStyle(`bottom: ${mockBox.bottomRow}px`);
    expect(boundingBox).toHaveStyle(`left: ${mockBox.leftCol}px`);
  });

  test("does not display container when imageUrl is not provided", () => {
    const { container } = render(<FaceRecognition imageUrl="" box={mockBox} />);
    expect(container).toBeEmptyDOMElement();
  });
});

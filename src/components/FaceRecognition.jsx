import React from "react";
import styled from "styled-components";

export default function FaceRecognition({ imageUrl, box }) {
  if (!imageUrl) {
    return null;
  }

  return (
    <FaceRecognitionContainer>
      <ImageWrapper>
        <Image
          id="inputimage"
          data-testid="input-image"
          alt=""
          src={imageUrl}
        />
        <BoundingBox
          data-testid="Bounding-Box"
          top={box.topRow}
          right={box.rightCol}
          bottom={box.bottomRow}
          left={box.leftCol}
        ></BoundingBox>
      </ImageWrapper>
    </FaceRecognitionContainer>
  );
}

const FaceRecognitionContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 350px;
  height: 350px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  position: relative;
  z-index: 2;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const BoundingBox = styled.div`
  position: absolute;
  box-shadow: 0 0 0 3px #149df2 inset;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  cursor: pointer;
  z-index: 5;
  top: ${(props) => props.top}px;
  right: ${(props) => props.right}px;
  bottom: ${(props) => props.bottom}px;
  left: ${(props) => props.left}px;
`;

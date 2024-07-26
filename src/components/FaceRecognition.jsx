import React from "react";
import styled from "styled-components";

export default function FaceRecognition({ imageUrl, box }) {
  return (
    <FaceRecognitionContainer>
      <ImageWrapper>
        <Image id="inputimage" alt="" src={imageUrl} />
        <BoundingBox
          topRow={box.topRow}
          rightCol={box.rightCol}
          bottomRow={box.bottomRow}
          leftCol={box.leftCol}
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
  /* position: absolute;
  margin-top: 1rem; */
  position: relative;
`;

const Image = styled.img`
  width: 500px;
  height: auto;
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
  top: ${(props) => props.topRow}px;
  right: ${(props) => props.rightCol}px;
  bottom: ${(props) => props.bottomRow}px;
  left: ${(props) => props.leftCol}px;
`;

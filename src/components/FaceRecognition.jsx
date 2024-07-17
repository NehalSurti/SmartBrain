import React from "react";
import styled from "styled-components";

export default function FaceRecognition({ imageUrl, box }) {
  return (
    <FaceRecognitionContainer>
      <AbsoluteDiv>
        <Image id="inputimage" alt="" src={imageUrl} />
        <BoundingBox
          topRow={box.topRow}
          rightCol={box.rightCol}
          bottomRow={box.bottomRow}
          leftCol={box.leftCol}
        ></BoundingBox>
      </AbsoluteDiv>
    </FaceRecognitionContainer>
  );
}

const FaceRecognitionContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: auto;
`;

const AbsoluteDiv = styled.div`
  position: absolute;
  margin-top: 2rem;
`;

const Image = styled.img`
  width: 500px;
  height: auto;
`;

const BoundingBox = styled.div`
  position: absolute;
  box-shadow: 0 0 0 3px #149df2 inset;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  cursor: pointer;
  top: ${(props) => props.topRow}px;
  right: ${(props) => props.rightCol}px;
  bottom: ${(props) => props.bottomRow}px;
  left: ${(props) => props.leftCol}px;
`;

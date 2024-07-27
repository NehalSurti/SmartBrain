import React from "react";
import styled from "styled-components";

export default function ImageLinkForm({ onInputChange, onButtonSubmit }) {
  return (
    <FormContainer>
      <FormTitle>
        {"This Magic Brain will detect face in your picture. Git it a try."}
      </FormTitle>
      <FormWrapper>
        <Form>
          <FormInput type="text" onChange={onInputChange} />
          <FormButton onClick={onButtonSubmit}>Detect</FormButton>
        </Form>
      </FormWrapper>
    </FormContainer>
  );
}

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
`;

const FormTitle = styled.p`
  font-size: 1.1rem;
  z-index: 2;
`;

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin: 20px;
  z-index: 2;
`;

const Form = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  background: radial-gradient(
        circle farthest-side at 0% 50%,
        #fb1 23.5%,
        rgba(240, 166, 17, 0) 0
      )
      21px 30px,
    radial-gradient(
        circle farthest-side at 0% 50%,
        #b71 24%,
        rgba(240, 166, 17, 0) 0
      )
      19px 30px,
    linear-gradient(
        #fb1 14%,
        rgba(240, 166, 17, 0) 0,
        rgba(240, 166, 17, 0) 85%,
        #fb1 0
      )
      0 0,
    linear-gradient(
        150deg,
        #fb1 24%,
        #b71 0,
        #b71 26%,
        rgba(240, 166, 17, 0) 0,
        rgba(240, 166, 17, 0) 74%,
        #b71 0,
        #b71 76%,
        #fb1 0
      )
      0 0,
    linear-gradient(
        30deg,
        #fb1 24%,
        #b71 0,
        #b71 26%,
        rgba(240, 166, 17, 0) 0,
        rgba(240, 166, 17, 0) 74%,
        #b71 0,
        #b71 76%,
        #fb1 0
      )
      0 0,
    linear-gradient(90deg, #b71 2%, #fb1 0, #fb1 98%, #b71 0%) 0 0 #fb1;
  background-size: 40px 60px;
`;

const FormInput = styled.input`
  padding: 5px;
  width: 70%;
  align-items: center;
  border: none;
  font-size: 15px;
`;

const FormButton = styled.button`
  width: 30%;
  padding: 10px;
  background-color: #8508c8;
  color: white;
  border: none;
  cursor: pointer;
`;

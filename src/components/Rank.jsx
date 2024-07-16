import React from "react";
import styled from "styled-components";

export default function Rank({ name, entries }) {
  return (
    <RankContainer>
      <RankTitle>
        {`${name}, your current entry count is...`}
      </RankTitle>
      <RankValue>{entries}</RankValue>
    </RankContainer>
  );
}

const RankContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px;
`;

const RankTitle = styled.div`
  color: white;
  font-size: 1rem;
  z-index: 2;
`;

const RankValue = styled.div`
  color: white;
  font-size: 1.5rem;
  z-index: 2;
`;

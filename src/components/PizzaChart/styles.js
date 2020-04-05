import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  background: #fff;
  border-radius: 8px;
  margin-top: 40px;
  margin-bottom: 40px;
  padding-top: 25px;
  padding-bottom: 25px;

  width: 80%;
  height: 100%;
`;

export const CustomTip = styled.div`
  background: #333;
  border-radius: 18px;
  padding: 5px 5px 5px 5px;

  p {
    font-weight: bold;
    font-size: 24px;
    color: #f5f5f5;
  }
`;

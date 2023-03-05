import styled from "styled-components";

export const Wrapper = styled.div`
  background: black;
  padding-bottom: 200px;
  position: relative;
`;

export const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

export const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
  font-weight: 400;
`;

export const Overview = styled.p`
  font-size: 25px;
  width: 50%;
`;
export const SlideBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  top: -100px;
`;

export const Slide = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 350px;
`;

export const SubTitle = styled.div`
  font-size: 28px;
  font-weight: 400;
  margin: 5px 50px;
`;
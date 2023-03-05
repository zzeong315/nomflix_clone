import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LeftAngle from "../icons/LeftAngle";
import RightAngle from "../icons/RightAngle";
import { makeImagePath } from "../utils";

export const SliderBox = styled.div`
  position: relative;
`;

export const ButtonBox = styled.div`
  position: absolute;
  height: 200px;
  top: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const Button = styled.button`
  background: rgba(0, 0, 0, 0.3);
  border: none;
  padding: 0;
  margin: 0;
  z-index: 400;
  cursor: pointer;
`;

export const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
  padding: 10px 70px;
`;

export const Box = styled(motion.div)<{ bgphoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  font-size: 66px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

export const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

export const rowVariants = {
  hidden: (custom: boolean) => ({
    x: custom ? window.outerWidth + 5 : -window.outerWidth - 5,
    opacity: 0,
  }),
  visible: {
    x: 0,
    opacity: 1,
  },
  exit: (custom: boolean) => ({
    // x: custom ? -window.outerWidth - 5 : window.outerWidth + 5,
    opacity: 0,
  }),
};

export const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -80,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

export const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const offset = 6;

const MovieSlider = (data: any) => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [isMinus, setIsMinus] = useState(false);
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = (movieId:number) => {
    navigate(`/movies/${movieId}`);
  };
  const increaseIndex = (id:string) => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      if (id === "minus") {
        setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
        setIsMinus(true);
      } else if (id === "plus") {
        setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
        setIsMinus(false);
      }
    }
  };
  console.log(data);

  return (
    <>
      <SliderBox>
        <ButtonBox>
          <Button onClick={() => increaseIndex("minus")}><LeftAngle/></Button>
          <Button onClick={() => increaseIndex("plus")}><RightAngle/></Button>
        </ButtonBox>
        <AnimatePresence onExitComplete={toggleLeaving} initial={false}>
          <Row
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            custom={isMinus}
            transition={{ type: "tween", duration: 1 }}
            key={index}
          >
            {Array.isArray(data?.results) ? 
            data?.results
              .slice(1)
              .slice(offset * index, offset * index + offset)
              .map((movie: any) => (
                <Box
                  key={movie.id}
                  // layoutId={movie.id + ""}
                  variants={boxVariants}
                  initial="normal"
                  whileHover="hover"
                  transition={{ type: "tween"}}
                  onClick={() => onBoxClicked(movie.id)}
                  bgphoto={makeImagePath(movie.backdrop_path, "w500")}
                >
                  <Info variants={infoVariants}>
                    <h4>{movie.title}</h4>
                  </Info>
                </Box>
              ))
              : 
                <Box
                  key={data.id}
                  layoutId={data.id + ""}
                  variants={boxVariants}
                  initial="normal"
                  whileHover="hover"
                  transition={{ type: "tween"}}
                  onClick={() => onBoxClicked(data.id)}
                  bgphoto={makeImagePath(data.backdrop_path, "w500")}
                >
                  <Info variants={infoVariants}>
                    <h4>{data.title}</h4>
                  </Info>
                </Box>
            }
          </Row>
        </AnimatePresence>
      </SliderBox>
    </>
  )
}

export default MovieSlider;

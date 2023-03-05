import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence, useViewportScroll } from "framer-motion";
import { useNavigate, useMatch, PathMatch } from "react-router-dom";
import styled from "styled-components";
import { getMovieDetail } from "../api";
import { IGetMovieDetail } from "../types";
import { makeImagePath } from "../utils";

export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  z-index: 500;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: auto;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
  z-index: 600;
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

export const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -80px;
`;

export const BigOverview = styled.p`
  padding: 15px 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`;
export const BigDetail = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  top: -80px;
  padding: 3px 20px;
`;

const MovieDetail = () => {
  const navigate = useNavigate();
  const bigMovieMatch:PathMatch<string> | null= useMatch("/movies/:id");
  const { scrollY } = useViewportScroll();
  const onOverlayClick = () => navigate("/");
  const movieParamsId = bigMovieMatch?.params.id
  const {isLoading, data} = useQuery<IGetMovieDetail>(["detail", bigMovieMatch], () => getMovieDetail(movieParamsId!));

  return (
    <>
      <AnimatePresence>
        {bigMovieMatch ? (
          <>
          <Overlay
            onClick={onOverlayClick}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
          <BigMovie
            style={{ top: scrollY.get() + 100 }}
            // layoutId={bigMovieMatch.params.movieId}
          >
            {data && (
                <>
                  <BigCover
                    style={{
                      backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                        data.backdrop_path,
                        "w500"
                      )})`,
                    }}
                  />
                  <BigTitle>{data.title}</BigTitle>
                  <BigDetail>
                    <span>genres: {data.genres.map((g) => <span>{g.name} </span>)}</span>
                    <span>{data.adult ? "19":"All"}</span>
                  </BigDetail>
                  <BigDetail>
                  <span>runtime: {data.runtime}m</span>
                  <span>{data.release_date}</span>
                  </BigDetail>

                  <BigOverview>{data.overview}</BigOverview>
                </>
              )}
          </BigMovie>
        </>
        ) : null}
      </AnimatePresence>
    </>
  )
}

export default MovieDetail;

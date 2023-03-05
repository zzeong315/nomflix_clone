import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence, useViewportScroll } from "framer-motion";
import { useNavigate, useMatch, PathMatch } from "react-router-dom";
import styled from "styled-components";
import { getTvDetail } from "../api";
import { IGetTvDetail } from "../types";
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
  padding: 20px;
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

const TvDetail = () => {
  const navigate = useNavigate();
  const bigTVMatch:PathMatch<string> | null= useMatch("/tv/:id");
  const { scrollY } = useViewportScroll();
  const onOverlayClick = () => navigate("/tv");
  const tvParamsId = bigTVMatch?.params.id
  const {isLoading, data} = useQuery<IGetTvDetail>(["detail", bigTVMatch], () => getTvDetail(tvParamsId!));
  console.log(data);

  return (
    <>
      <AnimatePresence>
        {bigTVMatch ? (
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
                  <BigTitle>{data.name}</BigTitle>
                  <BigDetail>
                    <span>genres: {data.genres.map((g) => <span>{g.name} </span>)}</span>
                    <span>total episodes: {data.number_of_episodes}</span>
                  </BigDetail>
                  <BigDetail>
                  <span>status: {data.status}</span>
                  <span>{data.first_air_date}</span>
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

export default TvDetail;
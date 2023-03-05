import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { getMovieSearch, getTvSearch } from "../api";
import MovieSlider from "../components/MovieSlider";
import { Slide, SubTitle } from "../styles/styles";
import { IGetMovieSearchResult, IGetTvSearchResult } from "../types";

const SearchWrapper = styled.div`
  margin-top: 120px;
`;

const Search = () => {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");

  const { isLoading: loadingMovieSearch, data: movieSearchData } =
    useQuery<IGetMovieSearchResult>(["movie", "search"], () =>
      getMovieSearch(keyword)
    );

  const { isLoading: loadingTvSearch, data: tvSearchData } =
    useQuery<IGetTvSearchResult>(["tv", "search"], () => getTvSearch(keyword));

  return (
    <SearchWrapper>
      {loadingMovieSearch ? (
        <div>Loading...</div>
      ) : (
        <Slide>
          <SubTitle>Movies ▶︎</SubTitle>
          <MovieSlider {...movieSearchData} search={true}/>
        </Slide>
      )}
      {loadingTvSearch ? (
        <div>Loading...</div>
      ) : (
        <Slide>
          <SubTitle>TV Show ▶︎</SubTitle>
          <MovieSlider {...tvSearchData} />
        </Slide>
      )}
    </SearchWrapper>
  );
};

export default Search;

import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, useApolloClient, gql } from "@apollo/client";
import { GET_MOVIE } from "../queries/moviesQuery";
import styled from 'styled-components';

const Movie = () => {
  const params = useParams();

  const { data, error, loading, client: { cache } } = useQuery(GET_MOVIE, {
    variables: {
      movieId: +params.id
    }
  });

  const likeHandler = () => {
    cache.writeFragment({
      id: `RealMovie:${+params.id}`,
      fragment: gql`
        fragment likeFragment on RealMovie {
          isLiked
        }
      `,
      data: {
        isLiked: !data.realMovie.isLiked
      }
    })
  }

  if(loading) return <p>Loading......</p>
  return (
    <Container>
      <Column>
        <Title>
        {loading ? "Loading..." : `${data.realMovie?.title}`}
        </Title>
        <Subtitle>⭐️ {data?.realMovie?.rating}</Subtitle>
        <button onClick={likeHandler}>{data?.realMovie.isLiked ? "Unlike" : "Like"}</button>
      </Column>
      <Image bg={data?.realMovie?.medium_cover_image} />
    </Container>
  )
}

export default Movie;

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 28px;
`;

const Image = styled.div`
  width: 25%;
  height: 60%;
  background-color: transparent;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
  border-radius: 7px;
`;
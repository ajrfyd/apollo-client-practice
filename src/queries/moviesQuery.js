import { gql } from "@apollo/client";

const GET_MOVIES = gql`
  query getMovies {
    realAllMovies {
      title
      id
      medium_cover_image
    }
  }
`

const GET_MOVIE = gql`
  query getMovie($movieId: Int!){
    realMovie(id: $movieId) {
      id
      title
      description_full
      medium_cover_image
      rating
      isLiked @client
    }
  }
`

export { GET_MOVIES, GET_MOVIE };
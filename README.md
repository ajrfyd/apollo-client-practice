### Nomad apollo client Movie App

> apollo client가 작동하는지 확인 하는 방법.(다른 방법도 있음)
화면에 출력 되야 한다
```js
  // routes/client.js
  client.query({
    query: gql`
      {
        allMovies {
          title
        }
      }
    `
  }).then(data => console.log(data));
```

> 
react component가 GET_MOVIE 쿼리를 얻기 위해 변수를 제공($movieId) apollo가 변수의 타입을 넣는다. 
그 뒤 서버의 쿼리(realMovie)에 그 변수를 파라미터로 넣어줌

```js
  const GET_MOVIE = gql`
    query getMovie($movieId: Int!){
      realMovie(id: $movieId) {
        id
        title
        description_full
        small_cover_image
      }
    }
  `
```

### local cache
>useQuery에서 client 안의 cache에 접근
client에만 존재하며 캐시로 유지할 수 있지만 서버에 저장되지 
않기 때문에 결국 사라짐
client query에 isLiked @client 형식으로 정의
```js
const likeHandler = () => {
    cache.writeFragment({
      // RealMovie 서버쪽 쿼리
      // apollo dev tools RootQuery에서 찾을 수 있음
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
```
import React , { useEffect, useState }from 'react'
import { API_URI, API_KEY, IMAGE_BASE_URL } from '../../Confing';
import { response } from 'express';
import { Url } from 'url';
import { Link } from 'react-router-dom';

type moviesData =  {
  adult: boolean;
  backdrop_path: string;
  id: number;
  original_language: "en"
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video:boolean;
  vote_average: number;
  vote_count: number;
}



function LandingPage() {

  const[MoviesData, setMoviesData] = useState<moviesData[]>([]);
  const [MainMovieImage, setMainMovieImage] = useState<moviesData | null>(null);
  const [MainMovieImage2, setMainMovieImage2] = useState<moviesData[]>([]);
  
  useEffect(()=>{
    const endpoint: string = `${API_URI}movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=1`; // ko-KR, en-US

    fetchMoviesData(endpoint);
  },[])

  const fetchMoviesData = async(endpoint: string) => {
    // fetch(endpoint)
    //   .then(response => response.json())
    //   .then(response => {
    //     //console.log(response.results);
    //     setMoviesData(response.results)
    //     setMainMovieImage(response.results[0])
    //     setMainMovieImage2(response.results.slice(0,5))
    //     //console.log(response.results.slice(0,5));
    //   })
    try{
      const response = await fetch(endpoint);
      if(!response){
        throw new Error("api 데이터 문제");
      }
      const data = await response.json();
      //console.log(data.results);
      setMoviesData(data.results)
      setMainMovieImage(data.results[0])
      setMainMovieImage2(data.results.slice(0,5))

    }catch(err){
      throw new Error("api 데이터 문제");
    }
    
  }
  
  return (
    <div>
      {/* 영화 콘텐츠 */}
      <h2>영화 콘텐츠</h2>
      <div style={{margin:'1'}}>
        {MoviesData.length > 0 ?(
          MoviesData.map((movie, index)=>(
            <React.Fragment key={index}>
              <Link to={`movie/${movie.id}`}>
                <img
                key={movie.id}
                src={`${IMAGE_BASE_URL}/w500${movie.poster_path}`}
                alt={movie.title}
                width={200}
                height={300}
                />
              </Link>
            </React.Fragment>
          ))
        ):(
          <p>영화 API Data 없어요.</p>
        )}
      </div>



    </div>
  )
}

export default LandingPage
import React, { useEffect,useState } from 'react'
import './RowPost.css'
import axios from '../../axios'
import YouTube from 'react-youtube'
import {imageUrl,API_KEY} from '../../constants/constants'
function RowPost(props) {
    const [movies, setmovies] = useState([])
    const [urlid, setUrlid] = useState('')
    useEffect(()=>{
        axios.get(props.url).then((Response)=>{
            // console.log(Response.data);

            setmovies(Response.data.results)
        }).catch(err=>{
            // alert('API illa ttto')
        })
    })
    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 0,
        },
    }
    const handleMovieTrailer =(id)=>{
            console.log(id);
            axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((Response)=>{
                if(Response.data.results.length !== 0){
                        setUrlid(Response.data.results[0])
                }else{

                    console.log('Not Available');
                }   
                
            }).catch(err=>{
                alert('Not available')
            })
    }
    return (
        <div className='row'>
            <h2>{props.title}</h2>
            <div className='posters'>
                {movies.map((obj)=>

                    <img onClick={()=>handleMovieTrailer(obj.id)} className={props.isSmall? 'smallposter':'poster'} alt='poster' src={`${imageUrl+obj.backdrop_path}`} />

                )}
            </div>
            
           { urlid && <YouTube videoId={urlid.key} opts={opts} />}
        </div>
    )
}

export default RowPost

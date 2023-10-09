import React, { useState } from 'react'
import './Banner.css'
import { useEffect } from 'react'
import axios from '../../axios'
import {API_KEY,imageUrl} from '../../constants/constants'
// import YouTube from 'react-youtube's
function Banner() {
    const [movie, setMovie ] = useState()
    // const [yt, setYt] = useState('')
    useEffect(()=>{
        axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`).then((Response)=>{
            setMovie(Response.data.results[18])
            const randomIndex = Math.floor(Math.random() * Response.data.results.length)
            // console.log(randomIndex);
            const randomMovie = Response.data.results[randomIndex]
            // console.log(randomMovie);
            setMovie(randomMovie)
        })
    },[])
    // const handleButton =(id)=>{
    //     console.log(id);
    //     axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((Response)=>{
    //         if (Response.data.results.length !== 0){
    //             setYt(Response.data.results[0])
    //         }else{
    //             console.log('Not Found');
    //         }
    //     }).catch(err=>{
    //         alert('Not Found')
    //     })
    // }
   
    return (
        <div 
        
        style={{backgroundImage:`url(${movie ? imageUrl+movie.backdrop_path : ""})`}}
         className='banner'>
            <div className='content' >
                <h1 className='title'>{movie ? movie.title: ""} </h1>
                <div className='banner_buttons' >
                    <button  className='button' >Play</button>
                    <button className='button' >My list</button>
                </div>
                
                <h1 className='description'> {movie ? movie.overview:""} </h1>
            </div>
            
        <div className="fade_bottom"></div>
        {/* {yt && <div className='banYt'> <YouTube videoId={yt.key} opts={opts} /></div>} */}
        </div>
    )
}

export default Banner

import music from "../assets/music.webp";
import photo from "../assets/phoot.jpeg";
import { GenerateBtn } from "./GenerateBtn";
import { useState, useEffect, useRef } from "react";
import { Mid } from "./Mid";

export function Results(props) {

  const [isResultImage, setIsResultImage] = useState(false);

  const toggleClassResultImage = () => {
    setIsResultImage((prev) => !prev);
  }

  return (
    <section className="results-con" ref={props.resultRef}>

      { isResultImage ? (<div className="album-img-con">
        <a href={props.url} target="_blank">
          <img src={props.cover} alt={props.track} className={isResultImage ? "result-black" : "result-image"} tabIndex={0}/>
        </a>
    
      </div>) : null }

      <div className="results-name">
        <div className="results-name-title">Song Title:{props.track}</div>
        <div className="results-artist">Artist:{props.artist}</div>
      </div>

      <div className="results-url-con">
      <a href={props.url} target="_blank"><div className="results-url">{props.url}</div></a>
      </div>
   
    </section>
  );
}
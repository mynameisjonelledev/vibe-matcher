import {useState, useRef} from "react";
import { Results } from "./Results";


export function GenerateBtn(props) {
  return (
 <section className="generate-btn-con">
    <div className="button-div">
      <button className="generate" id="generate"  onClick={props.playlist}>🎵 Gimme a beat </button>
    </div>
    
    </section>
  );
}
import {useState, useEffect, useRef} from "react";
import { GenerateBtn } from "./GenerateBtn";
import { Results } from "./Results";

export function Mid () {

  const [mood, setMood] = useState(null);
  const [token, setToken] = useState("");
  const [tracks, setTracks] = useState([]);
  const [showResult, setShowResult] = useState(null);
  const [trackUrl, setTrackUrl] = useState('');
  const [trackAlbum, setTrackAlbum] = useState(null);
  const [trackName, setTrackName] = useState('');
  const [artistName, setArtistName] = useState('');
  const [albumPicture, setAlbumPicture] = useState(null);

  const [resultsShow, setResultsShow] = useState(false);


  const resultRef = useRef(null);

  const [count, setCount] = useState(() => {
    const savedCount = localStorage.getItem('moodCount');
    return savedCount ? JSON.parse(savedCount) : {
      chill: 0,
      energetic: 0,
      happy: 0,
      romantic: 0,
      sad: 0
    };
  });

  function handleCount(type) {
    
    handleMood(type);

    if (mood === null) 
      return;

    setCount((prevCount) => {
      const updatedCount = {
        ...prevCount,
        [type]: prevCount[type] + 1,
      };

      localStorage.setItem('moodCount', JSON.stringify(updatedCount));
      return updatedCount;  
    });
  }

  function handleMood(type) {
    setMood((prevMood) => {
      const updatedMood = {
        ...prevMood,
        [type]: prevMood
      }
    })
  }

  function handleClick(type) {
    setShowResult(true);
  }
 
  async function handlePlaylist() {
    try {
      const res = await fetch("/api/spotify");
      if (!res.ok) throw new Error("Failed to fetch track");
      const trackData = await res.json();
      console.log("🎵 Track: ", trackData);

      setTrackName(trackData.name || 'No Track Found');
      setArtistName(trackData.artist || 'No Artist Found');
      setTrackUrl(trackData.url);

      setResultsShow(true);
      resultRef.current?.scrollIntoView({ behavior: "smooth" });
    

      } catch(error) {
        console.error('Fetch error: ', error);
      }
    }

  return(
    <>
   <section className="mid-section">
      <div className="mid1">
        <div className="mid-image-con">
          <img src="https://images.pexels.com/photos/799459/pexels-photo-799459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="mid-image" tabIndex={0} onClick={() => handleCount('chill')} />
        </div>

        <div className="mid-text-con">
          <div className="mood-title">Chill</div>
          <div className="click-count">{count.chill} FOLLOWER</div>
        </div>
      </div>

      <div className="mid1">
      <div className="mid-image-con">
          <img src="https://images.pexels.com/photos/9499949/pexels-photo-9499949.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="mid-image" tabIndex={0} onClick={() => handleCount('energetic')} />
        </div>

        <div className="mid-text-con">
          <div className="mood-title">Energetic</div>
          <div className="click-count">{count.energetic} FOLLOWER</div>
        </div>
      </div>

      <div className="mid1">
      <div className="mid-image-con">
          <img src="https://images.pexels.com/photos/772478/pexels-photo-772478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="mid-image" tabIndex={0} onClick={() => handleCount('happy')} />
        </div>

        <div className="mid-text-con">
          <div className="mood-title">Happy</div>
          <div className="click-count">{count.happy} FOLLOWER</div>
        </div>
      </div>

      <div className="mid1 mid1-romantic">
      <div className="mid-image-con">
          <img src="https://images.pexels.com/photos/11722307/pexels-photo-11722307.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="mid-image" tabIndex={0} onClick={() => handleCount('romantic')} />
        </div>

        <div className="mid-text-con">
          <div className="mood-title">Romantic</div>
          <div className="click-count">{count.romantic} FOLLOWER</div>
        </div>
      </div>

      <div className="mid1">
      <div className="mid-image-con">
          <img src="https://images.pexels.com/photos/792725/pexels-photo-792725.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="mid-image" tabIndex={0} onClick={() => handleCount('sad')} />
        </div>

        <div className="mid-text-con">
          <div className="mood-title">Sad</div>
          <div className="click-count">{count.sad} FOLLOWER</div>
        </div>
      </div>
      </section>

      { mood !== null ? 
      <GenerateBtn 
      playlist={handlePlaylist}
      
      
      
      /> : null}

    { trackUrl && artistName && trackName ? (<Results 
      url={trackUrl}
      track={trackName}
      artist={artistName}
      cover={albumPicture}
      resultRef={resultRef}
      />) : null} 
    </>
  );
}
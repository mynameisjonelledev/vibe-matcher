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
    console.log(type)

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
 

  useEffect(() => {
    const getToken = async () => {
      try {
        const clientId = "1495429c8d3349eb950c91afcc906e88";
        const clientSecret = "c14155599eb643abb748cf6e8ce46cbd";

        const res = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            grant_type: "client_credentials",
            client_id: clientId,
            client_secret: clientSecret,
          }),
          
        });

        const data = await res.json();
        //console.log("Access Token: ", data.access_token);
        console.log(data);
        setToken(data.access_token);
      } catch (error) {
        console.error("Error getting token", error);
      }
    };

    getToken();
  }, []);

  
  const handlePlaylist = async () => {
    try {
      const res = await fetch("./api/spotify");
      const track = await res.json();

      if (res.ok) {
        console.log("🎵 Random Track: ", track);
        setTrackName(track.name);
        setArtistName(track.artist);
        setTrackUrl(track.url);
        setAlbumPicture(track.image);
        setResultsShow(true);
      } else {
        console.error('Error fetching track: ', track.error);
      }

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

    <Results 
      url={trackUrl}
      track={trackName}
      artist={artistName}
      cover={albumPicture}
      resultRef={resultRef}
      />
    </>
  );
}
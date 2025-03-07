export default async function handler(req, res) {
  try {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    // 1. Get Spotify Access Token
    const authResponse = await fetch("https://accounts.spotify.com/api/token", {
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

    const authData = await authResponse.json();
    const token = authData.access_token;

    if (!token) {
      return res.status(500).json({ error: "Failed to retrieve Spotify token." });
    }

    // 2. Spotify Playlist ID (your mood playlist)
    const playlistId = "3NqEzg0b0iIG63aBwjjCEk";

    // 3. Fetch Tracks from the Playlist
    const playlistResponse = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!playlistResponse.ok) {
      const playlistError = await playlistResponse.text();
      console.error("Playlist Fetch Error: ", playlistError);
      return res.status(500).json({ error: "Failed to fetch playlist." });
    }

    const playlistData = await playlistResponse.json();

    if (!playlistData.items || playlistData.items.length === 0) {
      return res.status(404).json({ error: "No tracks found in the playlist." });
    }

    // 4. Randomly Select a Track
    const randomTrack = playlistData.items[
      Math.floor(Math.random() * playlistData.items.length)
    ];

    const track = {
      name: randomTrack.track.name || "Unknown Title",
      artist: randomTrack.track.artists[0].name || "Unknown Artist",
      url: randomTrack.track.external_urls.spotify || "",
      image: randomTrack.track.album.images[0].url || "",
    };

    console.log("Selected Track: ", track);

    // 5. Return the Random Track
    return res.status(200).json(track);

  } catch (error) {
    console.error("Error in Spotify handler:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

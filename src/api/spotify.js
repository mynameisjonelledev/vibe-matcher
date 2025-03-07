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
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=50`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (playlistResponse.status === 429) {
      const retryAfter = playlistResponse.headers.get('Retry-After') || 5;
      console.warn(`Rate limited. Retry after ${retryAfter} seconds.`);
      return res.status(429).json({ error: "Rate limited. Try again later." });
    }

    const playlistData = await playlistResponse.json();

    // 4. Ensure Tracks Exist
    if (!playlistData.items || playlistData.items.length === 0) {
      return res.status(404).json({ error: "No tracks found in the playlist." });
    }

    // 5. Randomly Select a Track
    const randomTrack = playlistData.items[Math.floor(Math.random() * playlistData.items.length)];
    const track = {
      name: randomTrack?.track?.name || "Unknown Title",
      artist: randomTrack?.track?.artists?.[0]?.name || "Unknown Artist",
      url: randomTrack?.track?.external_urls?.spotify || "",
      image: randomTrack?.track?.album?.images?.[0]?.url || "",
    };

    console.log("Selected Track: ", track);

    // 6. Return the Random Track
    res.status(200).json(track);

  } catch (error) {
    console.error("Error in Spotify handler:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

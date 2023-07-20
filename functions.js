import { playlists } from "./playlist.js";

export function playSongById(id) {
    const song = playlists.find((song) => song.id === id);
    if (song) {
      song.played += 1;
      console.log(`Now playing: ${song.title}`);
      return song;
    } else {
      console.log("Song not found!");
    }
}
import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import { v4 as uuidv4 } from "uuid";
import { playlists } from "./playlist.js";
import { playSongById } from "./functions.js";

const app = express();

app.get('/playlist', (req, res) => {
    const { sort } = req.query;
    if (sort){
        playlists.sort((a, b) => b.played - a.played);
    }
    console.log('Sending playlist to user');
    res.json(playlists);
});

app.post('/playlist', (req, res) => {
    const body = { req };
    const newSong = {
        id: uuidv4(),
        played: 0,
        ...body
    };

    playlists.push(newSong);
    console.log('Added new song to the playlist');
    res.json({
        message: 'success',
        data: newSong
    });
});

app.get('/playlist/:songId', (req, res) => {
    const { songId } = req.params;
    const song = playSongById(songId);
    res.json({
        message: 'success',
        data: song
    });
})

app.listen(process.env.APP_PORT, () => {
    console.log(`Spofity API is running on ${process.env.APP_PORT}`);
});
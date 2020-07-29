import { ipcMain } from 'electron';
import 'isomorphic-fetch';
import { IResultInfo } from '../interfaces/IResultInfo';
import { IBookResponse } from '../interfaces/IBookResponse';
import { IShowResponse } from '../interfaces/IShowResponse';
import GameTypes from '../enums/GameTypes';
import { IPeopleResponse } from '../interfaces/IPeopleResponse';
import { IDeveloperResponse, IGenreResponse } from '../interfaces/IResponse';
import { IGameResponse } from '../interfaces/IGameResponse';

ipcMain.on('/getBooks', async (event, resultInfo: IResultInfo) => {
    try {
        console.log('/getBooks');

        const resultsResponse = await fetch(`http://openlibrary.org/search.json?${resultInfo.type === 'genre' ? 'subject' : resultInfo.type}=${resultInfo.term}`);
        const results: IBookResponse = await resultsResponse.json();

        event.sender.send('BOOK_RESULT_DATA', results.docs);
    } catch (error) {
        console.trace(error);
        event.sender.send('NO_DATA', `No data available: ${error}`);
    }
});

ipcMain.on('/getShows', async (event, resultInfo: IResultInfo) => {
    try {
        console.log('/getShows');

        if (resultInfo.type === 'title') {
            const resultsResponse = await fetch(`http://api.tvmaze.com/search/shows?q=${resultInfo.term}`);
            const results: IShowResponse[] = await resultsResponse.json();
            event.sender.send('SHOW_RESULT_DATA', results);
        }
        if (resultInfo.type === 'person') {
            const resultsResponse = await fetch(`http://api.tvmaze.com/search/people?q=${resultInfo.term}`);
            const results: IPeopleResponse[] = await resultsResponse.json();
            event.sender.send('PEOPLE_RESULT_DATA', results);
        }
    } catch (error) {
        console.trace(error);
        event.sender.send('NO_DATA', `No data available: ${error}`);
    }
});

ipcMain.on('/getGames', async (event, resultInfo: IResultInfo) => {
    try {
        console.log('/getGames');

        let response: IGameResponse;

        switch (resultInfo.type) {
        case GameTypes.DEVELOPER: {
            const developerResponse = await fetch(`https://api.rawg.io/api/developers?search=${resultInfo.term}&page_size=1`);
            const developerResults: IDeveloperResponse = await developerResponse.json();
            const developerId = developerResults.results[0].id;
            const responseRaw = await fetch(`https://api.rawg.io/api/games?ordering=-rating&developers=${developerId}`);
            response = await responseRaw.json();
            event.sender.send('GAME_RESULT_DATA', response.results);
            break;
        }
        case GameTypes.GENRE: {
            const genreResponse = await fetch(`https://api.rawg.io/api/genres?search=${resultInfo.term}`);
            const genreResults: IGenreResponse = await genreResponse.json();
            const genre = genreResults.results.find((result) => result.name.toLowerCase() === resultInfo.term.toLowerCase());
            if (genre) {
                const responseRaw = await fetch(`https://api.rawg.io/api/games?ordering=-rating&genres=${genre.id}`);
                response = await responseRaw.json();
                event.sender.send('GAME_RESULT_DATA', response.results);
            }
            break;
        }
        case GameTypes.TITLE: {
            const titleResponse = await fetch(`https://api.rawg.io/api/games?search=${resultInfo.term}`);
            const titleResults: IGameResponse = await titleResponse.json();
            const titleId = titleResults.results[0].id;
            const responseRaw = await fetch(`https://api.rawg.io/api/games/${titleId}/suggested`);
            response = await responseRaw.json();
            event.sender.send('GAME_RESULT_DATA', response.results);
            break;
        }
        default:
            break;
        }
    } catch (error) {
        console.trace(error);
        event.sender.send('NO_DATA', `No data available: ${error}`);
    }
});

import { ipcMain } from 'electron';
import 'isomorphic-fetch';
import { IResultInfo } from '../interfaces/IResultInfo';
import { IBookResponse } from '../interfaces/IBookResponse';
import { IShowResponse } from '../interfaces/IShowResponse';
import GameTypes from '../enums/GameTypes';
import { IPeopleResponse } from '../interfaces/IPeopleResponse';
import { IDeveloperResponse, IGenreResponse } from '../interfaces/IResponse';
import { IGameResponse } from '../interfaces/IGameResponse';

ipcMain.handle('/getBooks', async (event, resultInfo: IResultInfo) => {
    try {
        console.log('/getBooks');

        const resultsResponse = await fetch(`http://openlibrary.org/search.json?${resultInfo.type === 'genre' ? 'subject' : resultInfo.type}=${resultInfo.term}`);
        const results: IBookResponse = await resultsResponse.json();
        return results.docs;
    } catch (error) {
        console.trace(error);
        throw new Error(error);
    }
});

ipcMain.handle('/getShows', async (event, resultInfo: IResultInfo) => {
    try {
        console.log('/getShows');

        const resultsResponse = await fetch(`http://api.tvmaze.com/search/shows?q=${resultInfo.term}`);
        const results: IShowResponse[] = await resultsResponse.json();
        return results;
    } catch (error) {
        console.trace(error);
        throw new Error(error);
    }
});

ipcMain.handle('/getPersons', async (event, resultInfo: IResultInfo) => {
    try {
        console.log('/getPersons');

        const resultsResponse = await fetch(`http://api.tvmaze.com/search/people?q=${resultInfo.term}`);
        const results: IPeopleResponse[] = await resultsResponse.json();
        return results;
    } catch (error) {
        console.trace(error);
        throw new Error(error);
    }
});

ipcMain.handle('/getGames', async (event, resultInfo: IResultInfo) => {
    try {
        console.log('/getGames');

        let response: IGameResponse;

        if (resultInfo.type === GameTypes.DEVELOPER) {
            const developerResponse = await fetch(`https://api.rawg.io/api/developers?search=${resultInfo.term}&page_size=1`);
            const developerResults: IDeveloperResponse = await developerResponse.json();
            const developerId = developerResults.results[0].id;
            const responseRaw = await fetch(`https://api.rawg.io/api/games?ordering=-rating&developers=${developerId}`);
            response = await responseRaw.json();
            return response.results;
        }
        if (resultInfo.type === GameTypes.GENRE) {
            const genreResponse = await fetch(`https://api.rawg.io/api/genres?search=${resultInfo.term}`);
            const genreResults: IGenreResponse = await genreResponse.json();
            const genre = genreResults.results.find((result) => result.name.toLowerCase() === resultInfo.term.toLowerCase());
            const responseRaw = await fetch(`https://api.rawg.io/api/games?ordering=-rating&genres=${genre?.id}`);
            response = await responseRaw.json();
            return response.results;
        }
        const titleResponse = await fetch(`https://api.rawg.io/api/games?search=${resultInfo.term}`);
        const titleResults: IGameResponse = await titleResponse.json();
        const titleId = titleResults.results[0].id;
        const responseRaw = await fetch(`https://api.rawg.io/api/games/${titleId}/suggested`);
        response = await responseRaw.json();
        return response.results;
    } catch (error) {
        console.trace(error);
        throw new Error(error);
    }
});

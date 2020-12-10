import { ipcMain } from 'electron';
import 'isomorphic-fetch';
import { ResultInfo } from '../interfaces/ResultInfo';
import { BookResponse } from '../interfaces/BookResponse';
import { ShowResponse } from '../interfaces/ShowResponse';
import { GameResponse } from '../interfaces/GameResponse';
import Colors from '../config/Colors';
import ApiService from '../services/ApiService';
import { EntryRequest } from '../interfaces/EntryRequest';
import DbService from '../services/DbService';
import { RemoveRequest } from '../interfaces/RemoveRequest';

ipcMain.handle('/getBooks', async (event, resultInfo: ResultInfo) => {
    try {
        console.log(Colors.fgYellow, `/getBooks ${resultInfo.type} ${resultInfo.term}`, Colors.fgReset);

        const results: BookResponse = await ApiService.getBooks(resultInfo);
        return results.docs;
    } catch (error) {
        console.trace(Colors.fgRed, error, Colors.fgReset);
        throw new Error(error);
    }
});

ipcMain.handle('/getShows', async (event, resultInfo: ResultInfo) => {
    try {
        console.log(Colors.fgYellow, `/getShows ${resultInfo.type} ${resultInfo.term}`, Colors.fgReset);

        const results: ShowResponse[] = await ApiService.getShows(resultInfo);
        return results;
    } catch (error) {
        console.trace(Colors.fgRed, error, Colors.fgReset);
        throw new Error(error);
    }
});

ipcMain.handle('/getGames', async (event, resultInfo: ResultInfo) => {
    try {
        console.log(Colors.fgYellow, `/getGames ${resultInfo.type} ${resultInfo.term}`, Colors.fgReset);

        const response: GameResponse = await ApiService.getGames(resultInfo);
        return response.results;
    } catch (error) {
        console.trace(Colors.fgRed, error, Colors.fgReset);
        throw new Error(error);
    }
});

ipcMain.handle('/addEntry', (event, request: EntryRequest) => {
    try {
        console.log(Colors.fgYellow, `/addEntry ${request.type}`, Colors.fgReset);

        DbService.addEntry(request);
        return 'SUCCESS';
    } catch (error) {
        console.trace(Colors.fgRed, error, Colors.fgReset);
        throw new Error(error);
    }
});

ipcMain.handle('/getEntries', (event, category: string) => {
    try {
        console.log(Colors.fgYellow, `/getEntries ${category}`, Colors.fgReset);

        const results = DbService.getEntries(category);
        return results;
    } catch (error) {
        console.trace(Colors.fgRed, error, Colors.fgReset);
        throw new Error(error);
    }
});

ipcMain.handle('/removeEntry', (event, request: RemoveRequest) => {
    try {
        console.log(Colors.fgYellow, `/removeEntry ${request.type}`, Colors.fgReset);

        DbService.removeEntry(request);
        return 'SUCCESS';
    } catch (error) {
        console.trace(Colors.fgRed, error, Colors.fgReset);
        throw new Error(error);
    }
});

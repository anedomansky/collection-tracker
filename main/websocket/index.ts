import { ipcMain } from 'electron';
import 'isomorphic-fetch';
import { IResultInfo } from '../interfaces/IResultInfo';
import { IBookResponse } from '../interfaces/IBookResponse';
import { IShowResponse } from '../interfaces/IShowResponse';
import { IGameResponse } from '../interfaces/IGameResponse';
import Colors from '../config/Colors';
import ApiService from '../services/ApiService';
import { IEntryRequest } from '../interfaces/IEntryRequest';

ipcMain.handle('/getBooks', async (event, resultInfo: IResultInfo) => {
    try {
        console.log(Colors.fgYellow, '/getBooks', Colors.fgReset);

        const results: IBookResponse = await ApiService.getInstance().getBooks(resultInfo);
        return results.docs;
    } catch (error) {
        console.trace(Colors.fgRed, error, Colors.fgReset);
        throw new Error(error);
    }
});

ipcMain.handle('/getShows', async (event, resultInfo: IResultInfo) => {
    try {
        console.log(Colors.fgYellow, '/getShows', Colors.fgReset);

        const results: IShowResponse[] = await ApiService.getInstance().getShows(resultInfo);
        return results;
    } catch (error) {
        console.trace(Colors.fgRed, error, Colors.fgReset);
        throw new Error(error);
    }
});

ipcMain.handle('/getGames', async (event, resultInfo: IResultInfo) => {
    try {
        console.log(Colors.fgYellow, '/getGames', Colors.fgReset);

        const response: IGameResponse = await ApiService.getInstance().getGames(resultInfo);
        return response.results;
    } catch (error) {
        console.trace(Colors.fgRed, error, Colors.fgReset);
        throw new Error(error);
    }
});

ipcMain.handle('/addEntry', (event, request: IEntryRequest) => {
});

ipcMain.handle('/getEntries', (event, type: string) => {
});

ipcMain.handle('/removeEntry', (event, request: IEntryRequest) => {
});

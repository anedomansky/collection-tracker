import { ipcMain } from 'electron';
import 'isomorphic-fetch';
import { IResultInfo } from '../interfaces/IResultInfo';

ipcMain.on('/getBooks', async (event, resultInfo: IResultInfo) => {
    try {
        console.log('/getBooks');

        const resultsResponse = await fetch(`http://openlibrary.org/search.json?${resultInfo.type === 'genre' ? 'subject' : resultInfo.type}=${resultInfo.term}`);
        const results = await resultsResponse.json();

        event.sender.send('BOOK_RESULT_DATA', results);
    } catch (error) {
        console.trace(error);
        event.sender.send('NO_DATA', `No data available: ${error}`);
    }
});

ipcMain.on('/getShows', async (event, resultInfo: IResultInfo) => {
    try {
        console.log('/getShows');
        
        
        event.sender.send('SHOW_RESULT_DATA', weatherDataConsolidated);
    } catch (error) {
        console.trace(error);
        event.sender.send('NO_DATA', `No data available: ${error}`);
    }
});

ipcMain.on('/getGames', async (event, resultInfo: IResultInfo) => {
    try {
        console.log('/getGames');
        
        
        event.sender.send('GAME_RESULT_DATA', weatherDataConsolidated);
    } catch (error) {
        console.trace(error);
        event.sender.send('NO_DATA', `No data available: ${error}`);
    }
});

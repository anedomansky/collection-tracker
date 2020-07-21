import { ipcMain } from 'electron';
import 'isomorphic-fetch';
import { IResultInfo } from '../interfaces/IResultInfo';
import GameTypes from '../enums/GameTypes';

ipcMain.on('/getBooks', async (event, resultInfo: IResultInfo) => {
    try {
        console.log('/getBooks');

        // TODO: create interface for the response: { docs: IBookResult[] }
        // TODO: create interface for the book result: { author_name: ["J.R.R. Tolkien"], cover_i: 8406786, title: "The Hobbit", first_publish_year: 1937}
        const resultsResponse = await fetch(`http://openlibrary.org/search.json?${resultInfo.type === 'genre' ? 'subject' : resultInfo.type}=${resultInfo.term}`);
        const results = await resultsResponse.json();

        event.sender.send('BOOK_RESULT_DATA', results.docs);
    } catch (error) {
        console.trace(error);
        event.sender.send('NO_DATA', `No data available: ${error}`);
    }
});

ipcMain.on('/getShows', async (event, resultInfo: IResultInfo) => {
    try {
        console.log('/getShows');

        let results;

        if (resultInfo.type === 'Title') {
            // TODO: create interface for IShowResult[] { show: IShow } IShow: { name: "Twin", premiered: "2019-10-27", officialSite: "https://tv.nrk.no/serie/twin", status: "Running", summary: "<p>Erik is a surfer-bum, who hasn't seen his identical twin Adam, a successful businessman with a picture-perfect family, for 17 years. When Erik loses everything, he reaches out to Adam, only to be rejected. A quarrel breaks out between them and Ingrid, Adam's wife, accidentally kills Adam. To cover the crime and to save his brother's family, Erik takes over Adam's identity.</p>", image: {medium: "http://static.tvmaze.com/uploads/images/medium_portrait/217/543894.jpg", original: "http://static.tvmaze.com/uploads/images/original_untouched/217/543894.jpg" }
            const resultsResponse = await fetch(`http://api.tvmaze.com/search/shows?q=${resultInfo.term}`);
            results = await resultsResponse.json();
        }
        if (resultInfo.type === 'Person') {
            // TODO create interface IPeopleResult[] { person: IPerson } IPerson: { name: "Lauren Bush Lauren", gender: "Female", birthday: "1984-06-25", deathday: null, image: { medium: "http://static.tvmaze.com/uploads/images/medium_portrait/108/272410.jpg" }, country: { name: "United States"} }
            const resultsResponse = await fetch(`http://api.tvmaze.com/search/people?q=${resultInfo.term}`);
            results = await resultsResponse.json();
        }


        event.sender.send('SHOW_RESULT_DATA', results);
    } catch (error) {
        console.trace(error);
        event.sender.send('NO_DATA', `No data available: ${error}`);
    }
});

ipcMain.on('/getGames', async (event, resultInfo: IResultInfo) => {
    try {
        console.log('/getGames');

        let response;

        switch (resultInfo.type) {
        case GameTypes.DEVELOPER: {
            // TODO: create interface for the developerResponse: { results: [{name: string, id: number}] }
            const developerResponse = await fetch(`https://api.rawg.io/api/developers?search=${resultInfo.term}&page_size=1`);
            const developerResults = await developerResponse.json();
            const developerId = developerResults.results[0].id;
            const responseRaw = await fetch(`https://api.rawg.io/api/games?ordering=-rating&developers=${developerId}`);
            response = await responseRaw.json();
            break;
        }
        case GameTypes.GENRE: {
            // TODO: create interface for the genreResponse: { results: [{name: string, id: number}] }
            const genreResponse = await fetch(`https://api.rawg.io/api/genres?search=${resultInfo.term}`);
            const genreResults = await genreResponse.json();
            const genre = genreResults.results.find((result) => result.name.toLowerCase() === resultInfo.term.toLowerCase());
            if (genre) {
                const responseRaw = await fetch(`https://api.rawg.io/api/games?ordering=-rating&genres=${genre.id}`);
                response = await responseRaw.json();
            }
            break;
        }
        case GameTypes.TITLE: {
            // TODO: create interface for the titleResponse: { results: IGameResult[] }
            const titleResponse = await fetch(`https://api.rawg.io/api/games?search=${resultInfo.term}`);
            const titleResults = await titleResponse.json();
            const titleId = titleResults.results[0].id;
            const responseRaw = await fetch(`https://api.rawg.io/api/games/${titleId}/suggested`);
            response = await responseRaw.json();
            break;
        }
        default:
            break;
        }

        // TODO: create interface for the response: { results: IGameResult[] }
        // TODO: create interface for the result: { name: "Mass Effect Trilogy", background_image: "https://media.rawg.io/media/games/036/036b0631f855ec96a4a2065511635116.jpg", released: "2012-11-06", rating: 4.76, rating_top: 5}
        event.sender.send('GAME_RESULT_DATA', response.results);
    } catch (error) {
        console.trace(error);
        event.sender.send('NO_DATA', `No data available: ${error}`);
    }
});

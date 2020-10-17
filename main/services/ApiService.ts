import 'isomorphic-fetch';
import GameTypes from '../enums/GameTypes';
import { IApiService } from '../interfaces/IApiService';
import { IBookResponse } from '../interfaces/IBookResponse';
import { IGameResponse } from '../interfaces/IGameResponse';
import { IDeveloperResponse, IGenreResponse } from '../interfaces/IResponse';
import { IResultInfo } from '../interfaces/IResultInfo';
import { IShowResponse } from '../interfaces/IShowResponse';

class ApiService implements IApiService {
    private static instance: ApiService;

    public static getInstance(): ApiService {
        if (!ApiService.instance) {
            ApiService.instance = new ApiService();
        }

        return ApiService.instance;
    }

    public async getBooks(resultInfo: IResultInfo): Promise<IBookResponse> {
        const resultsResponse = await fetch(`http://openlibrary.org/search.json?${resultInfo.type === 'genre' ? 'subject' : resultInfo.type}=${resultInfo.term}`);
        const results: IBookResponse = await resultsResponse.json();
        return results;
    }

    public async getShows(resultInfo: IResultInfo): Promise<IShowResponse[]> {
        const resultsResponse = await fetch(`http://api.tvmaze.com/search/shows?q=${resultInfo.term}`);
        const results: IShowResponse[] = await resultsResponse.json();
        return results;
    }

    public async getGames(resultInfo: IResultInfo): Promise<IGameResponse> {
        let response: IGameResponse;

        if (resultInfo.type === GameTypes.DEVELOPER) {
            const developerResponse = await fetch(`https://api.rawg.io/api/developers?search=${resultInfo.term}&page_size=1`);
            const developerResults: IDeveloperResponse = await developerResponse.json();
            const developerId = developerResults.results[0].id;
            const responseRaw = await fetch(`https://api.rawg.io/api/games?ordering=-rating&developers=${developerId}`);
            response = await responseRaw.json();
            return response;
        }
        if (resultInfo.type === GameTypes.GENRE) {
            const genreResponse = await fetch(`https://api.rawg.io/api/genres?search=${resultInfo.term}`);
            const genreResults: IGenreResponse = await genreResponse.json();
            const genre = genreResults.results.find((result) => result.name.toLowerCase() === resultInfo.term.toLowerCase());
            const responseRaw = await fetch(`https://api.rawg.io/api/games?ordering=-rating&genres=${genre?.id}`);
            response = await responseRaw.json();
            return response;
        }
        const titleResponse = await fetch(`https://api.rawg.io/api/games?search=${resultInfo.term}`);
        const titleResults: IGameResponse = await titleResponse.json();
        const titleId = titleResults.results[0].id;
        const responseRaw = await fetch(`https://api.rawg.io/api/games/${titleId}/suggested`);
        response = await responseRaw.json();
        return response;
    }
}

export default ApiService;

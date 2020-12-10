import 'isomorphic-fetch';
import GameTypes from '../enums/GameTypes';
import { BookResponse } from '../interfaces/BookResponse';
import { GameResponse } from '../interfaces/GameResponse';
import { DeveloperResponse, GenreResponse } from '../interfaces/Response';
import { ResultInfo } from '../interfaces/ResultInfo';
import { ShowResponse } from '../interfaces/ShowResponse';

class ApiService {
    public static async getBooks(resultInfo: ResultInfo): Promise<BookResponse> {
        const resultsResponse = await fetch(`http://openlibrary.org/search.json?${resultInfo.type === 'genre' ? 'subject' : resultInfo.type}=${resultInfo.term}`);
        const results: BookResponse = await resultsResponse.json();
        return results;
    }

    public static async getShows(resultInfo: ResultInfo): Promise<ShowResponse[]> {
        const resultsResponse = await fetch(`http://api.tvmaze.com/search/shows?q=${resultInfo.term}`);
        const results: ShowResponse[] = await resultsResponse.json();
        return results;
    }

    public static async getGames(resultInfo: ResultInfo): Promise<GameResponse> {
        let response: GameResponse;

        if (resultInfo.type === GameTypes.DEVELOPER) {
            const developerResponse = await fetch(`https://api.rawg.io/api/developers?search=${resultInfo.term}&page_size=1`);
            const developerResults: DeveloperResponse = await developerResponse.json();
            const developerId = developerResults.results[0].id;
            const responseRaw = await fetch(`https://api.rawg.io/api/games?ordering=-rating&developers=${developerId}`);
            response = await responseRaw.json();
            return response;
        }
        if (resultInfo.type === GameTypes.GENRE) {
            const genreResponse = await fetch(`https://api.rawg.io/api/genres?search=${resultInfo.term}`);
            const genreResults: GenreResponse = await genreResponse.json();
            const genre = genreResults.results.find((result) => result.name.toLowerCase() === resultInfo.term.toLowerCase());
            const responseRaw = await fetch(`https://api.rawg.io/api/games?ordering=-rating&genres=${genre?.id}`);
            response = await responseRaw.json();
            return response;
        }
        const titleResponse = await fetch(`https://api.rawg.io/api/games?search=${resultInfo.term}`);
        const titleResults: GameResponse = await titleResponse.json();
        const titleId = titleResults.results[0].id;
        const responseRaw = await fetch(`https://api.rawg.io/api/games/${titleId}/suggested`);
        response = await responseRaw.json();
        return response;
    }
}

export default ApiService;

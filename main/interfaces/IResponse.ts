interface Result {
    name: string;
    id: number;
}

interface IResponse {
    results: Result[];
}

export type IDeveloperResponse = IResponse;
export type IGenreResponse = IResponse;

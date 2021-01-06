interface Result {
    name: string;
    id: number;
}

interface Response {
    results: Result[];
}

export type DeveloperResponse = Response;
export type GenreResponse = Response;

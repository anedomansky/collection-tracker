export interface IGameResult {
    id: number;
    name: string;
    background_image: string;
    released: Date;
    rating: number;
    rating_top: number;
}

export interface IGameResponse {
    results: IGameResult[];
}

interface ShowImage {
    medium: string;
    original: string;
}

export interface IShowResult {
    id: number;
    name: string;
    premiered: Date;
    officialSite: string;
    status: string;
    summary: string;
    image: ShowImage;
}

export interface IShowResponse {
    show: IShowResult;
}

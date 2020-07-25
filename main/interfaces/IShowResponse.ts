interface ShowImage {
    medium: string;
    original: string;
}

interface ShowResult {
    name: string;
    premiered: Date;
    officialSite: string;
    status: string;
    summary: string;
    image: ShowImage;
}

export interface IShowResponse {
    show: ShowResult;
}

interface ShowImage {
    medium: string;
    original: string;
}

interface ShowResult {
    id: number;
    name: string;
    premiered: string;
    officialSite: string;
    status: string;
    summary: string;
    image: ShowImage;
}

export interface ShowResponse {
    show: ShowResult;
}

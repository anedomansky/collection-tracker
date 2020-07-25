interface BookResult {
    author_name: string[];
    cover_i: number;
    title: string;
    first_publish_year: number;
}

export interface IBookResponse {
    docs: BookResult[];
}

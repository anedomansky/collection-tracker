interface PersonImage {
    medium: string;
}

interface PersonCountry {
    name: string;
}

interface PeopleResult {
    name: string;
    gender: string;
    birthday: Date;
    deathday: Date | null;
    image: PersonImage;
    country: PersonCountry;
}

export interface IPeopleResponse {
    person: PeopleResult;
}

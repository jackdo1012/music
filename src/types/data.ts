export interface IMusic {
    artist: string;
    id: string;
    name: string;
    url: string;
    vidId: string;
}

export interface IArtist {
    id: string;
    name: string;
    songs: IMusic[];
}

export interface IMusic {
    id: string;
    name: string;
    url: string;
    artist: string;
    vidId: string;
    duration: string;
    thumbnail: string;
}

export interface IArtist {
    id: string;
    name: string;
    songs: IMusic[];
}

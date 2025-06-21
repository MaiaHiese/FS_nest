/* Este archivo lo creamos mediante CLI (consola) con nest g interface track*/

export interface Track {
    id: number;
    title: string;
    duration: number;
    artist: string
}

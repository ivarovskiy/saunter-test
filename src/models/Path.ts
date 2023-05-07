import { Coordinates } from "./Map";

export interface PathI {
    id: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    range: string;
    isFavorite: boolean;
    markers: Coordinates[];
}

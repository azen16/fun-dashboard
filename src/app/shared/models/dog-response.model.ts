import { DogBreed } from "./dog-breed.model";

export interface DogResponse {
    message: string[] | string | DogBreed;
    status: string;
}

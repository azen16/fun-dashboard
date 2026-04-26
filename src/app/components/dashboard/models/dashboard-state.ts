import { DogBreed } from "../../../shared/models/dog-breed.model";

export interface DashboardState {
    currentDog: DogBreed;
    dogList: DogBreed[];
}
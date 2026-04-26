import { DogBreed } from "../../../shared/models/dog-breed.model";

export interface DashboardState {
    currentDog: DogBreed;
    loading: boolean;
    dogList: DogBreed[];
}
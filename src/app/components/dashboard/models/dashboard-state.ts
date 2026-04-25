import { DogBreed } from "../../../shared/models/dog-breed.model";

export interface DashboardState {
    currentDog: string;
    loading: boolean;
    dogList: DogBreed[];
}
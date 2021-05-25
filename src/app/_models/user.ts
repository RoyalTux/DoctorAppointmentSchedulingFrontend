import { Rating } from "./rating";

export default class User{
    address: string = "";
    bio: string = "";
    city: string = "";
    country: string = "";
    firstName: string = "";
    id: string = "";
    lastName: string = "";
    phoneNumber: string = "";
    experienceYears: number = 0;
    rating: Rating = Rating.NO_RATING;
}
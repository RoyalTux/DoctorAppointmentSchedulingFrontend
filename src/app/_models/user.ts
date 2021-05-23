import { Rating } from "./rating";

export default class User{
    address: string = "No data";
    bio: string = "No data";
    city: string = "No data";
    country: string = "No data";
    firstName: string = "No data";
    id: string = "No data";
    lastName: string = "No data";
    phoneNumber: string = "No data";
    experienceYears: number = 0;
    rating: Rating = Rating.NO_RATING;
}
import User from "src/app/shared/models/user";
import { DoctorRating } from "./doctor-rating";

export default class Doctor extends User {
    experienceYears?: number = 0;
    rating?: DoctorRating = DoctorRating.NO_RATING;
}
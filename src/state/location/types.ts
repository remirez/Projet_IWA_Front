import { Status } from "../../globals";

export enum LocationSuccessTypes {
    LOCATION_SEND = 'LOCATION_SEND'
}

export type LocationState = {
    success?: LocationSuccessTypes;
    loading: boolean;
};

export type LocationType = {
    latitude: number;
    longitude: number;
    altitude: number;
    idUser: number;
    date: number;
    status: Status;
};
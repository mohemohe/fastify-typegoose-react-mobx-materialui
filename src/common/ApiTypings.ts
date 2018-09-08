import {UserType} from "./Constants";

export interface IUserApi {
	_id: string;
	name: string;
	type: UserType;
}

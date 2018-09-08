import {instanceMethod, InstanceType, ModelType, prop, staticMethod} from "typegoose";
import {IModelBase, ModelBase} from "./ModelBase";
import {UserType} from "../../common/Constants";
import {BCrypt} from "../infrastructure/Bcrypt";
import {IUserApi} from "../../common/ApiTypings";

export interface IUser extends IModelBase {
	type?: UserType;
	name?: string;
	password?: string;
}

export class User extends ModelBase implements IUser {
	@prop()
	public type?: UserType;

	@prop({index: true, unique: true})
	public name?: string;

	@prop()
	public password?: string;

	@staticMethod
	public static async createOrUpdate(this: ModelType<User> & typeof User, user: IUser) {
		if (user.password) {
			user.password = await BCrypt.hash(user.password);
		}
		return this.upsert({name: user.name}, user);
	}

	@staticMethod
	public static async search(this: ModelType<User> & typeof User, skip: string, keyword: string) {
		let searchParam;
		if (keyword) {
			let searchUserName: any = keyword;
			try {
				searchUserName = new RegExp(`.*${keyword}.*`);
			} catch (e) {}

			searchParam = {userName: searchUserName};
		}

		const total = await UserModel.count({});
		const result = await UserModel.find(searchParam).sort({userName: -1}).skip(parseInt(skip, 10)).limit(10);
		const filtered = result.length;

		return {
			total,
			filtered,
			result,
		};
	}

	@instanceMethod
	public async verifyPassword(this: InstanceType<User>, password?: string) {
		if (!this.password || !password) {
			return false;
		}
		return BCrypt.compare(password, this.password);
	}

	@instanceMethod
	public toUser(this: InstanceType<User>) {
		return {
			_id: this._id,
			type: this.type,
			name: this.name,
			password: this.password,
		} as IUser;
	}

	@instanceMethod
	public toApi(this: InstanceType<User>) {
		return {
			_id: this._id,
			type: this.type,
			name: this.name,
		} as IUserApi;
	}
}

export const UserModel = new User().export(User);

import mongoose from "mongoose";
import {ConfigModel} from "./model/Config";
import DefaultConfig from "./Config";
import {UserModel} from "./model/User";
import {UserType} from "../common/Constants";

export class Db {
	private mongoose?: typeof mongoose;

	public async initialize() {
		this.mongoose = await mongoose.connect(process.env.MONGO_URL || "");

		UserModel.createOrUpdate({
			name: "root",
			password: process.env.ROOT_PASSWORD || "root",
			type: UserType.Root,
		});
		for (const key of Object.keys(DefaultConfig)) {
			ConfigModel.init(key, DefaultConfig[key]);
		}
	}

	public async dispose() {
		if (this.mongoose) {
			return this.mongoose.disconnect();
		}
	}
}

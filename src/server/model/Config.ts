import {instanceMethod, InstanceType, ModelType, prop, staticMethod} from "typegoose";
import {IModelBase, ModelBase} from "./ModelBase";

export interface IConfig extends IModelBase {
	key?: string;
	value?: any;
}

export class Config extends ModelBase implements IConfig {
	@prop({index: true, unique: true, required: true})
	public key?: string;

	@prop({required: true})
	public value?: string;

	@staticMethod
	public static async get<T = any>(this: ModelType<Config> & typeof Config, key: string): Promise<T | null> {
		const findResult = await this.findOne({key});
		if (findResult) {
			return findResult.toConfig().value;
		}
		return null;
	}

	@staticMethod
	public static async set(this: ModelType<Config> & typeof Config, key: string, value: any) {
		if (typeof key !== typeof "") {
			return;
		}

		const doc = {
			key,
			value: JSON.stringify(value !== undefined ? value : `${null}`),
		};
		await this.upsert({key}, doc);
	}

	@staticMethod
	public static async delete(this: ModelType<Config> & typeof Config, key: string) {
		return this.deleteOne({key});
	}

	@staticMethod
	public static async init(this: ModelType<Config> & typeof Config, key: string, value: any) {
		const config = await this.get(key);
		if (!config) {
			await this.set(key, value);
		}
	}

	@instanceMethod
	public toConfig(this: InstanceType<Config>) {
		return {
			key: this.key,
			value: JSON.parse(this.value || `${null}`),
		} as IConfig;
	}
}

export const ConfigModel = new Config().export(Config);

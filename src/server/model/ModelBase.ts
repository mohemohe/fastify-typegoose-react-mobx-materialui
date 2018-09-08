import mongoose from "mongoose";
import {ModelType, prop, staticMethod, Typegoose} from "typegoose";

export interface IModelBase {
	_id?: mongoose.Types.ObjectId;
}

export class ModelBase extends Typegoose implements IModelBase {
	@prop({_id: true, default: new mongoose.Types.ObjectId()})
	public _id?: mongoose.Types.ObjectId;

	@staticMethod
	public static async upsert<T, U>(this: ModelType<T>, find: U & IModelBase, doc: U & IModelBase) {
		const isExist = await this.findOne(find);
		if (!isExist && !doc._id) {
			doc._id = new mongoose.Types.ObjectId();
		}
		return this.update(find, doc, {upsert: true});
	}

	@staticMethod
	public static toObjectId(id: any) {
		return mongoose.Types.ObjectId(id);
	}

	@staticMethod
	public static findOneById<T>(this: ModelType<T> & T, id: unknown) {
		return this.findOne({_id: mongoose.Types.ObjectId(id as string)});
	}

	public export<T>(cls: T) {
		return this.getModelForClass(cls);
	}
}

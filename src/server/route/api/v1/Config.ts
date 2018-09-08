import {IncomingMessage, OutgoingMessage} from "http";
import {FastifyReply, FastifyRequest} from "fastify";
import route from "../../../decorator/Route";
import {RouteBase} from "../../RouteBase";
import isAuthorized from "../../../decorator/IsAuthorized";
import isRoot from "../../../decorator/IsRoot";
import {ConfigModel} from "../../../model/Config";
import DefaultConfig from "../../../Config";

@route("/api/v1/config")
export class Config extends RouteBase {
	@isAuthorized()
	public static async get(req: FastifyRequest<IncomingMessage>, res: FastifyReply<OutgoingMessage>) {
		const config = {} as {[key: string]: any};
		for (const key of Object.keys(DefaultConfig)) {
			config[key] = await ConfigModel.get(key);
		}

		res.send({
			statusCode: 200,
			config,
		});
	}

	@isAuthorized()
	@isRoot()
	public static async put(req: FastifyRequest<IncomingMessage>, res: FastifyReply<OutgoingMessage>) {
		for (const key of Object.keys(DefaultConfig)) {
			if (req.body[key]) {
				await ConfigModel.set(key, req.body[key]);
			}
		}

		res.send({
			statusCode: 200,
		});
	}
}

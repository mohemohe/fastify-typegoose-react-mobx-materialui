import {IncomingMessage, OutgoingMessage} from "http";
import {FastifyReply, FastifyRequest} from "fastify";
import route from "../../../decorator/Route";
import {RouteBase} from "../../RouteBase";
import {Auth as AuthInfrastructure} from "../../../infrastructure/Auth";

@route("/api/v1/auth")
export class Auth extends RouteBase {
	public static async post(req: FastifyRequest<IncomingMessage>, res: FastifyReply<OutgoingMessage>) {
		if (!req.body.name) {
			throw new Error("name is required");
		}
		if (!req.body.password) {
			throw new Error("password is required");
		}

		const result = await AuthInfrastructure.login(req.body.name, req.body.password);
		res.send({
			statusCode: 200,
			tokens: result,
		});
	}

	public static async put(req: FastifyRequest<IncomingMessage>, res: FastifyReply<OutgoingMessage>) {
		if (!req.body.accessToken) {
			throw new Error("accessToken is required");
		}
		if (!req.body.refreshToken) {
			throw new Error("refreshToken is required");
		}

		const result = await AuthInfrastructure.refresh(req.body.accessToken, req.body.refreshToken);
		res.send({
			statusCode: 200,
			tokens: result,
		});
	}
}

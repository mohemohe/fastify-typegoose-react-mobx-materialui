import {IncomingMessage, OutgoingMessage} from "http";
import {FastifyReply, FastifyRequest} from "fastify";
import route from "../../../decorator/Route";
import {RouteBase} from "../../RouteBase";
import isAuthorized from "../../../decorator/IsAuthorized";
import {IUser, UserModel} from "../../../model/User";

@route("/api/v1/user")
export class User extends RouteBase {
	@isAuthorized()
	public static async get(req: FastifyRequest<IncomingMessage>, res: FastifyReply<OutgoingMessage>) {
		const users = await UserModel.search(req.query.skip || 0, req.query.keyword || "");

		res.header("Content-Type", "application/json").code(200);
		res.send({
			statusCode: 200,
			total: users.total,
			filtered: users.filtered,
			users: users.result.map((user) => {
				return user.toApi();
			}),
		});
	}
}

@route("/api/v1/me")
export class Me extends RouteBase {
	@isAuthorized()
	public static async get(req: FastifyRequest<IncomingMessage>, res: FastifyReply<OutgoingMessage>) {
		const user = Object.assign({}, req.params.user) as IUser;
		delete user.password;
		res.header("Content-Type", "application/json").code(200);
		res.send({
			statusCode: 200,
			user,
		});
	}
}

import {FastifyReply, FastifyRequest} from "fastify";
import {IncomingMessage, OutgoingMessage} from "http";
import {Auth} from "../infrastructure/Auth";

export default function isAuthorized() {
	return (target: any, key: string, descriptor: any) => {
		if (descriptor === undefined) {
			descriptor = Object.getOwnPropertyDescriptor(target, key);
		}

		const originalMethod = descriptor.value;

		descriptor.value = async (req: FastifyRequest<IncomingMessage>, res: FastifyReply<OutgoingMessage>) => {
			const unAuthorized = (message?: string) => {
				return res.code(401).send({
					statusCode: 401,
					error: "Unauthorized",
					message: message || "Authorization header seems missing",
				});
			};

			let token;
			if (req.headers.authorization) {
				const header = req.headers.authorization as string;
				const type = header.split(" ")[0];
				if (type.toLowerCase() !== "bearer") {
					return unAuthorized();
				}
				token = header.split(" ")[1];
			} else if (req.params.token) {
				token = req.params.token;
			} else {
				return unAuthorized();
			}

			let user;
			try {
				user = await Auth.authorize(token);
			} catch (e) {
				return unAuthorized(e.message);
			}
			if (user) {
				req.params.user = user.toUser();
				return originalMethod.apply(target, [req, res]);
			} else {
				return unAuthorized();
			}
		};

		return descriptor;
	};
}

import {FastifyReply, FastifyRequest} from "fastify";
import {IncomingMessage, OutgoingMessage} from "http";
import {IUser} from "../model/User";
import {UserType} from "../../common/Constants";

export default function isAdmin() {
	return (target: any, key: string, descriptor: any) => {
		if (descriptor === undefined) {
			descriptor = Object.getOwnPropertyDescriptor(target, key);
		}

		const originalMethod = descriptor.value;

		descriptor.value = async (req: FastifyRequest<IncomingMessage>, res: FastifyReply<OutgoingMessage>) => {
			const user = req.params.user as IUser;
			if (user.type !== UserType.Root) {
				return res.code(403).send({
					statusCode: 403,
					error: "Forbidden",
					message: "The user has been invalid",
				});
			}

			return originalMethod.apply(target, [req, res]);
		};

		return descriptor;
	};
}

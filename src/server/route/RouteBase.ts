import {FastifyInstance} from "fastify";

export class RouteBase {
	public static register(server: FastifyInstance, opts: any, next: () => void): void {
		next();
	}
}

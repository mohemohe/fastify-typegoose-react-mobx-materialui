import {FastifyInstance} from "fastify";
import routes from "./route/Index";

export async function Router(server: FastifyInstance) {
	routes.forEach((route) => {
		server.register(route.register);
	});
}

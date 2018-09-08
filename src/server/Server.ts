import fastify from "fastify";
import {join} from "path";
import {Router} from "./Router";
import {Db} from "./Db";

export class Server {
	private fastify: fastify.FastifyInstance;

	constructor() {
		this.fastify = fastify({
			logger: true,
		});
	}

	public async start() {
		const db = new Db();

		await Promise.all([
			db.initialize(),
			Router(this.fastify),
		]);

		this.fastify.register(require("fastify-static"), {
			root: join(process.cwd(), "./public"),
			prefix: join("/", process.env.URI_PREFIX || "", "/"),
			send: {
				cacheControl: false,
			},
		});

		this.fastify.listen(3000, "0.0.0.0", (error) => {
			if (error) {
				db.dispose();
				throw error;
			}
		});
	}
}

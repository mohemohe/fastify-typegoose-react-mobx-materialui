import {FastifyInstance} from "fastify";
import {join} from "path";

export default function route(path: string) {
	return (target: any) => {
		const normalizedPath = join("/", process.env.URI_PREFIX || "", path);
		return class extends target {
			public static register(server: FastifyInstance, opts: any, next: () => void): void {
				if (target.get) {
					server.get(normalizedPath, target.get);
				}
				if (target.post) {
					server.post(normalizedPath, target.post);
				}
				if (target.put) {
					server.put(normalizedPath, target.put);
				}
				if (target.delete) {
					server.delete(normalizedPath, target.delete);
				}
				if (target.head) {
					server.head(normalizedPath, target.head);
				}
				if (target.patch) {
					server.patch(normalizedPath, target.patch);
				}

				next();
			}
		} as typeof target;
	};
}

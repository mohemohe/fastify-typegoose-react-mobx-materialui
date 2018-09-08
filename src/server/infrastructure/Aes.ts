import * as crypto from "crypto";

export class Aes {
	private key: string;
	private iv: string;

	constructor(password?: string) {
		let source: string;
		if (password) {
			source = password;
		} else {
			source = process.env.ENCRYPT_PASSWORD || "";
		}
		const encryptHash = crypto.createHash("sha256").update(source, "utf8").digest("hex");
		this.iv = encryptHash.substring(0, 16);
		this.key = encryptHash.substring(32);
	}

	public encrypt(data: any): string {
		const iv = Buffer.from(this.iv);
		const cipher = crypto.createCipheriv("aes-256-cbc", this.key, iv);
		let encData = cipher.update(JSON.stringify(data), "utf8", "base64");
		encData += cipher.final("base64");
		return encData;
	}

	public decrypt<T = string>(data: string): T {
		try {
			const iv = Buffer.from(this.iv);
			const cipher = crypto.createDecipheriv("aes-256-cbc", this.key, iv);
			let decData = cipher.update(data, "base64", "utf8");
			decData += cipher.final("utf8");
			return JSON.parse(decData) as T;
		} catch (e) {
			console.error(e);
			return (data as any) as T;
		}
	}

	public static encrypt(data: any): string {
		return new Aes().encrypt(data);
	}

	public static decrypt<T = string>(data: string): T {
		return new Aes().decrypt(data);
	}
}

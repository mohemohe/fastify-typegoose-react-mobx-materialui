import bcrypt from "bcryptjs";

export class BCrypt {
	public static hash(text: string) {
		return bcrypt.hash(text, parseInt(process.env.BCRYPT_SALT_ROUNDS!, 10) || 10);
	}

	public static compare(text: string, hash: string) {
		return bcrypt.compare(text, hash);
	}
}

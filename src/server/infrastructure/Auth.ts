import * as jwt from "jsonwebtoken";
import {InstanceType} from "typegoose";
import {IUser, User, UserModel} from "../model/User";

export class Auth {
	public static async login(name: string, password: string) {
		const user = await UserModel.findOne({name});
		if (!user) {
			throw new Error("invalid user");
		}
		const result = await user.verifyPassword(password);
		if (!result) {
			throw new Error("invalid password");
		}

		const accessToken = jwt.sign(user.toApi(), process.env.JWT_SECRET || "", {
			algorithm: "HS256",
			expiresIn: "1d",
		});
		const refreshToken = jwt.sign(user.toApi(), process.env.JWT_SECRET || "", {
			algorithm: "HS512",
			expiresIn: "7d",
		});

		return {
			accessToken,
			refreshToken,
		};
	}

	public static async refresh(accessToken: string, refreshToken: string) {
		let jwtUser;
		try {
			const accessTokenUser = jwt.verify(accessToken, process.env.JWT_SECRET || "", {
				algorithms: ["HS256"],
				ignoreExpiration: true,
			}) as IUser;
			jwtUser = jwt.verify(refreshToken, process.env.JWT_SECRET || "", {
				algorithms: ["HS512"],
			}) as IUser;

			if (accessTokenUser._id !== jwtUser._id) {
				throw new Error("accessToken and refreshToken isnt same user");
			}
		} catch (e) {
			throw new Error(e.message);
		}

		const user = await UserModel.findOneById(jwtUser._id);
		if (!user) {
			throw new Error("invalid user");
		}
		const newJwtUser = user.toApi();
		const newAccessToken = jwt.sign(newJwtUser, process.env.JWT_SECRET || "", {
			algorithm: "HS256",
			expiresIn: "1d",
		});
		const newRefreshToken = jwt.sign(newJwtUser, process.env.JWT_SECRET || "", {
			algorithm: "HS512",
			expiresIn: "7d",
		});

		return {
			accessToken: newAccessToken,
			refreshToken: newRefreshToken,
		};
	}

	public static async authorize(accessToken: string) {
		let user;
		try {
			user = jwt.verify(accessToken, process.env.JWT_SECRET || "", {
				algorithms: ["HS256"],
			}) as IUser;
		} catch (e) {
			throw new Error(e.message);
		}
		if (user) {
			const dbUser = await UserModel.findOneById(user._id);
			if (dbUser) {
				return dbUser as any as InstanceType<User>;
			} else {
				throw new Error("user has not been found");
			}
		} else {
			throw new Error("internal server error");
		}
	}
}

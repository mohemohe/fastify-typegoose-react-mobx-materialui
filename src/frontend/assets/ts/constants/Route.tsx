import * as React from "react";
import { Drafts, AccessAlarm, Search } from "@material-ui/icons";
import { Index } from "../containers/page/Index";
import { LoginPage } from "../containers/page/auth/Login";
import { LogoutPage } from "../containers/page/auth/Logout";
import { SamplePage } from "../containers/page/Sample";
import { ExamplePage } from "../containers/page/Example";

export interface IRouteInfo {
	name: string;
	path?: string;
	component?: any;
	showLeftNav: boolean;
	permission: number[];
	icon?: any;
	children?: IRouteInfo[];
	link?: boolean;
}

export const ROUTES: IRouteInfo[] = [
	// 全般
	{
		name: "Index",
		path: "/",
		component: Index,
		showLeftNav: false,
		permission: [],
	},
	{
		name: "ログイン",
		path: "/auth/login",
		component: LoginPage,
		showLeftNav: false,
		permission: [],
	},
	{
		name: "ログアウト",
		path: "/auth/logout",
		component: LogoutPage,
		showLeftNav: false,
		permission: [],
	},
	{
		name: "親メニュー1",
		path: "/sample-menu-1",
		icon: <Drafts/>,
		showLeftNav: true,
		permission: [],
		children: [
			{
				name: "さんぷる",
				path: "/sample-menu-1/sample",
				component: SamplePage,
				showLeftNav: true,
				permission: [],
			},
			{
				name: "サンプル",
				path: "/sample-menu-1/example",
				component: ExamplePage,
				showLeftNav: true,
				permission: [],
			},
		],
	},
	{
		name: "親メニュー2",
		path: "/sample-menu-2",
		icon: <AccessAlarm/>,
		showLeftNav: true,
		permission: [],
		children: [
			{
				name: "さんぷる",
				path: "/sample-menu-2/sample",
				component: SamplePage,
				showLeftNav: true,
				permission: [],
			},
			{
				name: "サンプル",
				path: "/sample-menu-2/example",
				component: ExamplePage,
				showLeftNav: true,
				permission: [],
			},
		],
	},
	{
		name: "外部リンク (Google)",
		path: "https://google.com",
		icon: <Search/>,
		showLeftNav: true,
		permission: [],
	},
];

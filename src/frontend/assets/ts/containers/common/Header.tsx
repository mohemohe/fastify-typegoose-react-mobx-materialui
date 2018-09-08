import * as React from "react";
import {style} from "typestyle/lib";
import {Redirect} from "react-router-dom";
import {inject, observer} from "mobx-react";
import {Button, Menu, MenuItem} from "@material-ui/core";
import {AccountCircle} from "@material-ui/icons";
import {HeaderBar} from "../../components/HeaderBar";
import {AuthStatus, AuthStore} from "../../stores/AuthStore";
import {COLORS, FONTS} from "../../constants/Style";
import {HistoryStore} from "../../stores/HistoryStore";

const styles = {
	root: style({
		display: "flex",
		flexDirection: "row",
	}),
	domainInfo: style({
		marginRight: 26,
	}),
	userInfo: style({
		marginLeft: "0.5rem",
		color: COLORS.EmotionalWhite,
		textTransform: "none",
	}),
	menuIcon: style({
		color: COLORS.EmotionalWhite,
	}),
	menuText: style({
		fontFamily: FONTS.Default,
	}),
	endSpoofingAdminButton: style({
		display: "flex",
		alignItems: "center",
		marginRight: 23,
	}),
};

interface IProps extends React.ClassAttributes<{}> {
	menu?: any;
	AuthStore?: AuthStore;
	HistoryStore?: HistoryStore;
}

interface IState extends React.ComponentState {
	anchorElement: HTMLElement | null;
}

@inject("AuthStore", "HistoryStore")
@observer
export class Header extends React.Component<IProps, IState> {
	public state = {
		anchorElement: null,
	};

	constructor(props: IProps, state: IState) {
		super(props, state);

		this.handleMenu = this.handleMenu.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.logout = this.logout.bind(this);
	}

	public componentWillMount() {
		this.props.AuthStore!.checkAuth();
	}

	private logout() {
		this.handleClose();
		this.props.HistoryStore!.move("/auth/logout");
	}

	public render() {
		const {anchorElement} = this.state;
		const open = anchorElement !== null;
		const isAuthorized = this.props.AuthStore!.authStatus === AuthStatus.Authorized;

		if (!isAuthorized && !(this.props.HistoryStore!.current === "/auth/login" || this.props.HistoryStore!.current === "/auth/logout" || this.props.HistoryStore!.current.match(/\/auth\/login\/callback\/[^/]*/))) {
			return <Redirect to="/auth/login"/>;
		}

		const menu = (
			<div>
				<Button
					aria-owns={open ? "menu-appbar" : undefined}
					aria-haspopup="true"
					onClick={this.handleMenu}

				>
					<AccountCircle className={styles.menuIcon}/>
					<div className={styles.userInfo}>
						{this.props.AuthStore!.userInfo.name}
					</div>
				</Button>
				<Menu
					id="menu-appbar"
					anchorEl={anchorElement ? anchorElement : undefined}
					anchorOrigin={{
						vertical: "top",
						horizontal: "right",
					}}
					transformOrigin={{
						vertical: "top",
						horizontal: "right",
					}}
					open={open}
					onClose={this.handleClose}
				>
					<MenuItem onClick={this.logout} className={styles.menuText}>ログアウト</MenuItem>
				</Menu>
			</div>
		);

		const rightComponent = isAuthorized ?
			<div className={styles.root}>
				{menu}
			</div> :
			<></>;

		return (
			<div>
				<HeaderBar rightComponent={rightComponent} elevation={isAuthorized ? 8 : 0}/>
			</div>
		);
	}

	private handleMenu(event: any) {
		this.setState({
			anchorElement: event.currentTarget,
		});
	}

	private handleClose() {
		this.setState({
			anchorElement: null,
		});
	}
}

import * as React from "react";
import { style } from "typestyle/lib";
import { AppBar, Toolbar } from "@material-ui/core";
import { COLORS, SIZES } from "../constants/Style";

const styles = {
	appBar: style({
		height: SIZES.Header.height,
		minHeight: SIZES.Header.height,
		backgroundColor: COLORS.DarkColor,
		color: COLORS.EmotionalWhite,
	}),
	toolBar: style({
		height: SIZES.Header.height,
		minHeight: SIZES.Header.height,
		display: "flex",
		justifyContent: "space-between",
		paddingRight: 0,
	}),
	logo: style({
		height: SIZES.Header.Logo.height,
		transform: `scale(${SIZES.Header.Logo.transform})`,
		transformOrigin: "left",
	}),
};

interface IProps extends React.ClassAttributes<HTMLDivElement> {
	style?: any;
	rightComponent?: any;
	elevation?: number;
}

interface IState extends React.ComponentState {
	anchorElement?: HTMLElement;
}

export class HeaderBar extends React.Component<IProps, IState> {
	public state = {
		anchorElement: undefined,
	};

	constructor(props: IProps, state: IState) {
		super(props, state);
	}

	public render() {
		return (
			<div className={this.props.style}>
				<AppBar position="sticky" color="default" className={styles.appBar} elevation={this.props.elevation || 0}>
					<Toolbar className={styles.toolBar}>
						<span style={{fontFamily: "'Pacifico', cursive", fontSize: 32}}>{process.env.BRAND_NAME}</span>
						{this.props.rightComponent}
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

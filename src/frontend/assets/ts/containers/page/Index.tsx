import * as React from "react";
import {Redirect} from "react-router-dom";
import {inject, observer} from "mobx-react";
import {AuthStatus, AuthStore} from "../../stores/AuthStore";

interface IProps extends React.ClassAttributes<{}> {
	AuthStore?: AuthStore;
}

interface IState extends React.ComponentState {
}

@inject("AuthStore")
@observer
export class Index extends React.Component<IProps, IState> {
	constructor(props: IProps, state: IState) {
		super(props, state);
	}

	public render() {
		if (this.props.AuthStore!.authStatus === AuthStatus.Unauthorized) {
			return <Redirect to="/auth/login"/>;
		}
		return <Redirect to="/sample-menu-1/sample"/>;
	}
}

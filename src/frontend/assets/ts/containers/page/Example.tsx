import * as React from "react";

interface IProps extends React.ClassAttributes<HTMLDivElement> {
}

interface IState extends React.ComponentState {
}

export class ExamplePage extends React.Component {
	constructor(props: IProps, state: IState) {
		super(props, state);
	}

	public render() {
		return (
			<div>
				サンプル！プルプルプル！
			</div>
		);
	}
}

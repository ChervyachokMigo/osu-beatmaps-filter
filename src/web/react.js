'use strict';

const { createElement } = React;

class ReactRoot extends React.Component {
	constructor(props) {
		super(props);
		this.state = { liked: false };
	}

	render() {
		if (this.state.liked) {
			return 'You liked this.';
		}

		return (
		<button onClick={() => this.setState({ liked: true })}>
			Like
		</button>
		);
	}
}

const domContainer = document.querySelector('#ReactRoot');
const root = ReactDOM.createRoot(domContainer);
root.render(createElement(ReactRoot));
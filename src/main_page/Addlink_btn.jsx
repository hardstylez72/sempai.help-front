import React, {Component} from 'react';
import {
	Grid,
	Jumbotron,
	FormGroup,
	ControlLabel,
	FormControl,
	HelpBlock,
	Button,
	Form,
} from 'react-bootstrap';

class addLink_btn extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			descrVal: '',
			urlValue: '',
			articles: [],
		};

		this.handleClick = this.handleClick.bind(this);
		this.handleChangeUrl = this.handleChangeUrl.bind(this);
		this.handleChangeDescr = this.handleChangeDescr.bind(this);
	}

	handleChangeUrl(event) {
		this.setState({urlValue: event.target.value});
	}

	handleChangeDescr(event) {
		this.setState({descrVal: event.target.value});
	}

	handleClick(e) {
		var data = this.state;
		fetch('/addlink', {
			method: 'post',
			headers: {
				Accept: 'application/json, text/plain, */*',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({data}),
		})
			.then(res => res.json())
			.then(dataFromServer => this.setState({articles: dataFromServer.articles}));
	}

	render() {
		return (
			<Grid>
				<Form>
					<FormGroup controlId="formBasicText">
						<ControlLabel>Введите ссылку</ControlLabel>
						<FormControl
							bsSize="large"
							componentClass="textarea"
							placeholder="Enter description"
							onChange={this.handleChangeUrl}
						/>
					</FormGroup>

					<FormGroup controlId="formInlineEmail">
						<ControlLabel>Введите описание</ControlLabel>
						<FormControl
							bsSize="large"
							componentClass="textarea"
							placeholder="Enter description"
							onChange={this.handleChangeDescr}
						/>
					</FormGroup>
				</Form>
				<Button type="submit" onClick={this.handleClick}>
					Отпавить
				</Button>
			</Grid>
		);
	}
}

export default addLink_btn;

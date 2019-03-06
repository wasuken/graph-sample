import React from 'react'
import { Chart } from "react-google-charts"


class CsvView extends React.Component{
	constructor(){
		super();
		this.state = {
			json: [{key:"value"}]
		}
		this.jsonUpdate();
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(e){
		let year_select = document.querySelector("#year");
		let player_type_select = document.querySelector("#player_type");
		let player_type = player_type_select
			.options[player_type_select.selectedIndex].value
		let year = year_select.options[year_select.selectedIndex].value
		this.jsonUpdate(year, player_type);
	}
	jsonUpdate(year="18", player_type="batter"){
		let that = this;
		fetch(`/api/v1/player/${year}/${player_type}`)
			.then(resp => resp.json())
			.then(json => that.setState({json: json}));
	}
	render(){
		let headers = Object.keys(this.state.json[0])
							.map((value, i) => <th key={i}>{value}</th>)
		let datas = this.state.json.map(v => {
			return (
				<tbody>
					{Object.values(v).map((value, i) => (
						<td key={i}>{value}</td>
					))}
				</tbody>
			);
		});
		return (
			<div>
				<select id="year"
					onChange={(e) => this.handleClick(e) }>
					{['17', '16', '15', '14', '13', '12', '11', '10']
						.map((v, i) => <option key={i} value={v}>{v}</option>)}
				</select>
				<select id="player_type"
					onChange={(e) => this.handleClick(e) }>
					{['batter', 'pitcher']
						.map((v, i) => <option key={i} value={v}>{v}</option>)}
				</select>
				<table>
					<thead>
						{headers}
					</thead>
					{datas}
				</table>
			</div>
		);
	}
}
export default CsvView;

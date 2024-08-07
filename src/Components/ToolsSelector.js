import { useContext } from "react"
import { ActionStatusContext, SelectedToolsContext } from "./Contexts/main";
import { ActionStatus, ToolsValues } from "./Consts/main";


export const ToolsSelector = (args) => {
	const {setName} = useContext(SelectedToolsContext);
	const {status} = useContext(ActionStatusContext);
	
	const tools_tags = Object.values(ToolsValues).map( (x, i) => 
		<option key={i}
		value={x.name}>{x.title}</option>
	);

	return (
		<div>
			<select 
				name="tools" 
				disabled={status === ActionStatus.processing} 
				onChange={(e) => setName(e.target.value)}>
					{tools_tags}
			</select>
		</div>
	);
}
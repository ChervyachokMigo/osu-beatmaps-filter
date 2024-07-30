import { ToolsSelector } from "./ToolsSelector";
import { ActionStatusContext, SelectedToolsContext } from "./Contexts/main";
import { useContext, useEffect } from "react";
import { ActionStatus, ToolsValues } from "./Consts/main";

export default function Main() {
	
	const SelectedTools = useContext(SelectedToolsContext);
	const {setStatus} = useContext(ActionStatusContext);

    useEffect( () => {
		setStatus(ActionStatus.idle);
	// eslint-disable-next-line
	}, [SelectedTools.name]);

	const tool = ToolsValues[SelectedTools.name];

	if (tool) {
		return (<div>
			<ToolsSelector />
			{tool.tag}
		</div>)
	} else {
		return (<div><ToolsSelector />No tool selected</div>)
	}
	

}
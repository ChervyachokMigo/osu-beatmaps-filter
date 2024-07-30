import { ToolsSelector } from "./ToolsSelector";
import { StarrateFix } from "./ToolsViews/StarrateFix";
import { dialog_names } from "../consts";
import { ActionStatusContext, DialogsActiveProvider, SelectedToolsContext } from "./Contexts/main";
import { useContext, useEffect } from "react";
import { ActionStatus, ToolsNames } from "./Consts/main";
import { ManiaSliderCollections } from "./ToolsViews/ManiaSliderCollections";

export default function Main() {
	
	const SelectedTools = useContext(SelectedToolsContext);
	const {setStatus} = useContext(ActionStatusContext);

    useEffect( () => {
		setStatus(ActionStatus.idle);
	// eslint-disable-next-line
	}, [SelectedTools.name]);

	return (<div>

			<ToolsSelector />

			{SelectedTools.name === ToolsNames.starrate_fix.name?
					<DialogsActiveProvider dialog_name={dialog_names.input}>
					<DialogsActiveProvider dialog_name={dialog_names.output}>

						<StarrateFix />

					</DialogsActiveProvider>
					</DialogsActiveProvider>
			:<></>}

			{SelectedTools.name === ToolsNames.mania_slider_collections.name?
					<DialogsActiveProvider dialog_name={dialog_names.input}>
					<DialogsActiveProvider dialog_name={dialog_names.input_2}>
					<DialogsActiveProvider dialog_name={dialog_names.output}>

						<ManiaSliderCollections />

					</DialogsActiveProvider>
					</DialogsActiveProvider>
					</DialogsActiveProvider>
			:<></>}

	</div>)
}
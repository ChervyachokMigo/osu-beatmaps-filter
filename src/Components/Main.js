import { ToolsSelector } from "./ToolsSelector";
import { StarrateFix } from "./StarrateFix";
import { dialog_names } from "../consts";
import { ActionStatusProvider, DialogsActiveProvider, SelectedToolsContext } from "./Contexts/main";
import { useContext } from "react";
import { ToolsNames } from "./Consts/main";
import { ManiaSliderCollections } from "./ManiaSliderCollections";


export default function Main() {
	
	const SelectedTools = useContext(SelectedToolsContext);

	return (<div>
		<ActionStatusProvider>

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

		</ActionStatusProvider>

	</div>)
}
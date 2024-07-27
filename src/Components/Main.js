import { ToolsSelector } from "./ToolsSelector";
import { StarrateFix } from "./StarrateFix";
import { dialog_names } from "../consts";
import { DialogsActiveProvider } from "./Contexts/main";


export default function Main() {

	return (<div>
		<ToolsSelector />

		<DialogsActiveProvider dialog_name={dialog_names.input}>
		<DialogsActiveProvider dialog_name={dialog_names.output}>

			<StarrateFix />

		</DialogsActiveProvider>
		</DialogsActiveProvider>
	</div>
	)
}
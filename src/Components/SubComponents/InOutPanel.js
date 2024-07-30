import { useContext } from "react"
import { ActionStatusContext, DialogActiveContext } from "../Contexts/main";

import { FileDialog } from "./FileDialog";
import { ActionStatus, PanelValues } from "../Consts/main";

const default_button_text = 'select';

export const InOutPanel = ({ 
	panel_type, 
	display_path_default_text, 
	dialog_name, 
	dialog_title, 
	dialog_accept_ext,
	filePath,
	setFilePath,
	button_text = default_button_text }) => {
		
	const { status } = useContext(ActionStatusContext);

	const { setActive } = useContext(DialogActiveContext({ dialog_name }));

	return (
		<div className="in_out_panel">

			<div className="display_path">
				{PanelValues[panel_type].display_path_prefix_text}
				{!filePath ? display_path_default_text : filePath}
			</div>

			<button className="file_button"
				disabled={ status === ActionStatus.processing } 
				onClick={ () => setActive(true) } >
				{button_text}
			</button>

			{ panel_type === 'input' ?
				<FileDialog 
					title={dialog_title}
					type={PanelValues[panel_type].file_dialog_type}
					onClickFile={setFilePath}
					dialog_name={dialog_name}
					accept_ext={dialog_accept_ext}
				/>: ''}

			{ panel_type === 'output'?
				<FileDialog 
					title={dialog_title}
					type={PanelValues[panel_type].file_dialog_type}
					onClickOK={setFilePath}
					dialog_name={dialog_name}
					accept_ext={dialog_accept_ext}
				/>: ''}

		</div>
	);
}
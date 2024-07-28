import { useContext, useState } from "react"
import { ActionStatusContext, DialogActiveContext } from "./Contexts/main";

import { dialog_names } from "../consts";
import { POST } from "../tools/request_api";
import { FileDialog } from "./FileDialog";
import { ActionStatus, ToolsNames } from "./Consts/main";

export const StarrateFix = (args) => {

	const {status, setStatus} = useContext(ActionStatusContext);
	
	const input_dialog = useContext(DialogActiveContext({ dialog_name: dialog_names.input }));
	const output_dialog = useContext(DialogActiveContext({ dialog_name: dialog_names.output }));

	const [inputFile, setInputFile] = useState('');
	const [outputFile, setOutputFile] = useState('');

	const PerformAction = async () => {
		setStatus(ActionStatus.processing);
		POST('starrate-fix', {
			input_path: inputFile,
            output_path: outputFile,

		}).then( result => {
			console.log(result);
			setStatus(ActionStatus.finished);

		}).catch( error => {
            console.error(error);
			setStatus(ActionStatus.error);

        });
	};

	const empty_input_text = "Select input osu!.db";
	const empty_output_text = "Select output osu!.db";

	return (<div className="starrate_fix_form">
		<div className="description">Описание: {ToolsNames.desc}</div>
			<div className="input-group">

				<div className="input_path">
					Input: {!inputFile ? empty_input_text : inputFile}
				</div>

				<button className="input_file_button" 
					disabled={ status === ActionStatus.processing } 
					onClick={() => input_dialog.setActive(true)} >
					select
				</button>

				<FileDialog 
					title="Select input osu!.db"
					type='open_file'
					onClickFile={setInputFile}
					dialog_name={dialog_names.input}
					accept_ext='.db'
				/>

				<div className="output_path">
					Output: {!outputFile ? empty_output_text : outputFile}
				</div>

				<button className="output_file_button" 
					disabled={ status === ActionStatus.processing } 
					onClick={() => output_dialog.setActive(true)} >
					select
				</button>

				<FileDialog 
					title="Select output osu!.db"
					type='save_file'
					onClickOK={setOutputFile}
					dialog_name={dialog_names.output}
					accept_ext='.db'
				/>

				<button 
					disabled={ !inputFile || !outputFile || status === ActionStatus.processing } 
					onClick={PerformAction}>
						Fix Starrate
				</button>

				<div className="status">
					{status === ActionStatus.processing && 'Processing...'}
					{status === ActionStatus.finished && 'Finished'}
					{status === ActionStatus.error && 'Error occurred'}
					{status === ActionStatus.idle && ''}
				</div>
				
			</div>
		</div>
	);
}
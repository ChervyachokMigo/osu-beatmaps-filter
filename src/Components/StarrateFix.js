import { useContext, useState } from "react"
import { ActionStatusContext } from "./Contexts/main";

import { dialog_names } from "../consts";
import { POST } from "../tools/request_api";

import { ActionStatus, ToolsNames } from "./Consts/main";
import { InOutPanel } from "./InOutPanel";

export const StarrateFix = (args) => {

	const {status, setStatus} = useContext(ActionStatusContext);
	
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

	return (<div className="starrate_fix_form">
		<div className="description">Описание: {ToolsNames.desc}</div>
			<div className="input-group">

				<InOutPanel 
					panel_type='input'
					display_path_default_text='Select input osu!.db'
					dialog_name={dialog_names.input}
					dialog_title='Select input osu!.db'
					dialog_accept_ext='.db'
					button_text='select'
					filePath={inputFile}
					setFilePath={setInputFile}
				/>

				<InOutPanel 
					panel_type='output'
					display_path_default_text='Select output osu!.db'
					dialog_name={dialog_names.output}
					dialog_title='Select output osu!.db'
					dialog_accept_ext='.db'
					button_text='select'
					filePath={outputFile}
					setFilePath={setOutputFile}
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
import { useContext, useState } from "react"
import { ActionStatusContext } from "../Contexts/main";

import { POST } from "../../tools/request_api";
import { dialog_names, ActionStatus, ToolsValues } from "../Consts/main";
import { InOutPanel } from "../SubComponents/InOutPanel";

export const FindMissedBeatmaps = (args) => {

	const {status, setStatus} = useContext(ActionStatusContext);
	
	const [inputFile, setInputFile] = useState('');
	const [outputFile, setOutputFile] = useState('');

	const [requestArgs, setRequestArgs] = useState({
		api_key: null
	});

	const PerformAction = async () => {
		setStatus(ActionStatus.processing);
		POST('find-missed-beatmaps', {
			input_path: inputFile,
            output_path: outputFile,
			args: requestArgs

		}).then( result => {
			console.log(result);
			setStatus(ActionStatus.finished);

		}).catch( error => {
            console.error(error);
			setStatus(ActionStatus.error);

        });
	};

	const change_args_value = (name, value, isNumber = false) => {
		if (typeof value === "string" && !value) {
			delete requestArgs[name];
			setRequestArgs(requestArgs);
		} else {
			setRequestArgs({...requestArgs, [name]: isNumber ? Number(value) : value });
		}
	}

	return (<div className="find_missed_beatmaps_form">
		<div className="description">Описание: {ToolsValues.find_missed_beatmaps.desc}</div>
			<div className="input-group">

				<InOutPanel 
					panel_type='dir'
					display_path_default_text='Select osu path'
					dialog_name={dialog_names.input}
					dialog_title='Select osu path'
					button_text='select'
					filePath={inputFile}
					setFilePath={setInputFile}
				/>

				<InOutPanel 
					panel_type='dir'
					display_path_default_text='Select output path'
					dialog_name={dialog_names.output}
					dialog_title='Select output path'
					button_text='select'
					filePath={outputFile}
					setFilePath={setOutputFile}
				/>

				<div className="api_key_block">
					<label for="api_key">Api key</label>
					<input type="text" id="api_key" name="api_key" 
						checked={requestArgs.api_key}
						disabled={ status === ActionStatus.processing } 
						onChange={ (e) =>change_args_value( 'api_key', e.target.value, false ) } />
				</div>

				<button 
					disabled={ !inputFile || !outputFile || status === ActionStatus.processing } 
					onClick={PerformAction}>
						Find Missed Beatmaps
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
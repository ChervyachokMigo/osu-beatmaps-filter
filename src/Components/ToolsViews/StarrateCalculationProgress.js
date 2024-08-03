import { useContext, useState } from "react"
import { ActionStatusContext } from "../Contexts/main";

import { POST } from "../../tools/request_api";

import { dialog_names, ActionStatus, ToolsValues } from "../Consts/main";
import { InOutPanel } from "../SubComponents/InOutPanel";

export const StarrateCalculationProgress = (args) => {

	const {status, setStatus} = useContext(ActionStatusContext);
	
	const [inputFile, setInputFile] = useState('');

	const PerformAction = async () => {
		setStatus(ActionStatus.processing);
		POST('starrate-calculation-progress', {
			input_path: inputFile,

		}).then( result => {
			console.log(result);
			setStatus(ActionStatus.finished);

		}).catch( error => {
            console.error(error);
			setStatus(ActionStatus.error);

        });
	};

	return (<div className={ToolsValues.starrate_calculation_progress.name + '_form'}>
		<div className="description">Описание: {ToolsValues.starrate_calculation_progress.desc}</div>
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

				<button 
					disabled={ !inputFile || status === ActionStatus.processing } 
					onClick={PerformAction}>
						Starrate Calculation Progress
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
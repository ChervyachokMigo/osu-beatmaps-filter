import { useContext, useState } from "react"
import { ActionStatusContext } from "../Contexts/main";

import { POST } from "../../tools/request_api";

import { dialog_names, ActionStatus, ToolsValues } from "../Consts/main";
import { InOutPanel } from "../SubComponents/InOutPanel";

export const StarrateExport = (args) => {

	const {status, setStatus} = useContext(ActionStatusContext);
	
	const [inputFile, setInputFile] = useState('');
	const [outputFile, setOutputFile] = useState('');

	const PerformAction = async () => {
		setStatus(ActionStatus.processing);
		POST('starrate-export', {
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

	return (<div className='form_block'>
		<div className="description">Описание: {ToolsValues.starrate_export.desc}</div>
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
					display_path_default_text='Select output bin file'
					dialog_name={dialog_names.output}
					dialog_title='Select output bin file'
					dialog_accept_ext='.bin'
					button_text='select'
					filePath={outputFile}
					setFilePath={setOutputFile}
				/>

                <div className="action_block">
					<button 
						className="actionStart"
						disabled={ !inputFile || !outputFile || status === ActionStatus.processing } 
						onClick={PerformAction}>
							Export Starrate
					</button>
				</div>
				
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
import { useContext, useState } from "react"
import { ActionStatusContext } from "../Contexts/main";

import { POST } from "../../tools/request_api";
import { dialog_names, ActionStatus, ToolsValues } from "../Consts/main";
import { InOutPanel } from "../SubComponents/InOutPanel";

export const ManiaSliderCollections = (args) => {

	const {status, setStatus} = useContext(ActionStatusContext);
	
	const [inputFile, setInputFile] = useState('');
	const [outputFile, setOutputFile] = useState('');

	const PerformAction = async () => {
		setStatus(ActionStatus.processing);
		POST('mania-slider-collections', {
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

	return (<div className="mania_slider_collections_form">
		<div className="description">Описание: {ToolsValues.mania_slider_collections.desc}</div>
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
					panel_type='output'
					display_path_default_text="Select output collection.db"
					dialog_name={dialog_names.output}
					dialog_title="Select output collection.db"
					dialog_accept_ext='.db'
					button_text='select'
					filePath={outputFile}
					setFilePath={setOutputFile}
				/>

				<button 
					disabled={ !inputFile|| !outputFile || status === ActionStatus.processing } 
					onClick={PerformAction}>
						Create Mania Collection
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
import { useContext, useState } from "react"
import { ActionStatusContext } from "../Contexts/main";

import { POST } from "../../tools/request_api";

import { dialog_names, ActionStatus, ToolsValues } from "../Consts/main";
import { InOutPanel } from "../SubComponents/InOutPanel";

export const SameBeatmaps = (args) => {

	const {status, setStatus} = useContext(ActionStatusContext);
	
	const [inputFile, setInputFile] = useState('');

	const [Folders, setFolders] = useState([]);

	const PerformAction = async (action) => {
		setStatus(ActionStatus.processing);
		POST('same-beatmaps', {
			input_path: inputFile,
			action

		}).then( result => {
			if (result.action === "same-beatmaps-scan") {
				if (typeof result.response === 'object' && Array.isArray(result.response)){
					setFolders(result.response);
				}
			}
			console.log(result);
			setStatus(ActionStatus.finished);

		}).catch( error => {
            console.error(error);
			setStatus(ActionStatus.error);

        });
	};

	const OpenAction = async (beatmapset_id, name) => {
		const folder = Folders.find( x => x.id === beatmapset_id);
		setStatus(ActionStatus.processing);
		POST('same-beatmaps', {
			action: 'open',
			input_path: inputFile,
			selected_id: folder.folders.findIndex( x => x === name),
			folder,

		}).then( result => {
			console.log(result);
			setStatus(ActionStatus.finished);

		}).catch( error => {
            console.error(error);
			setStatus(ActionStatus.error);

        });
	};

	const ConcatAction = async (beatmapset_id, name) => {
		const folder = Folders.find( x => x.id === beatmapset_id);
		setStatus(ActionStatus.processing);
		POST('same-beatmaps', {
			action: 'concat',
			input_path: inputFile,
			selected_id: folder.folders.findIndex( x => x === name),
			folder,

		}).then( result => {
			console.log(result);
			const el = document.getElementById('folder_' + beatmapset_id);
			el.classList.add("invisible");
			setStatus(ActionStatus.finished);

		}).catch( error => {
            console.error(error);
			setStatus(ActionStatus.error);

        });
	};


	return (<div className='form_block'>
		<div className="description">Описание: {ToolsValues.same_beatmaps.desc}</div>
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

				<div className="action_block">
					<button 
						className="actionStart"
						disabled={ !inputFile || status === ActionStatus.processing } 
						onClick={ () => PerformAction('scan') }>
							Same Beatmaps Scan
					</button>
				</div>

				<div className="files-group">
					{Folders.map(({ id, folders }) => (
                        <div id={'folder_' + id} className="folder_block">{ 
							folders.map( (name, i) => 
								<div key={i} className="folder" >
									<div className="folder_name">
										{name}
									</div>
									<div className="actions">
										<button onClick={ () => OpenAction(id, name) }>
											Open
										</button>
										<button onClick={ () => ConcatAction(id, name) }>
											Concat
										</button>
									</div>
								</div> )
						}</div>
                    ))}
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
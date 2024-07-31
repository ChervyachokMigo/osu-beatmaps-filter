import { useContext, useState } from "react"
import { ActionStatusContext } from "../Contexts/main";

import { dialog_names } from "../../consts";
import { POST } from "../../tools/request_api";
import { ActionStatus, ToolsValues } from "../Consts/main";
import { InOutPanel } from "../SubComponents/InOutPanel";

export const DeleteBeatmaps = (args) => {

	const {status, setStatus} = useContext(ActionStatusContext);
	
	const [inputFile, setInputFile] = useState('');
	const [inputFile_2, setInputFile_2] = useState('');
	const [deleteBeatmapsArgs, setDeleteBeatmapsArgs] = useState({
		backup_instead_delete: true
	});

	const PerformAction = async () => {
		setStatus(ActionStatus.processing);
		POST('delete-beatmaps', {
			input_path: inputFile,
            input_2_path: inputFile_2,
			args: deleteBeatmapsArgs

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
			delete deleteBeatmapsArgs[name];
			setDeleteBeatmapsArgs(deleteBeatmapsArgs);
		} else {
			setDeleteBeatmapsArgs({...deleteBeatmapsArgs, [name]: isNumber ? Number(value) : value });
		}
	}

	return (<div className="delete_beatmaps_form">
		<div className="description">Описание: {ToolsValues.delete_beatmaps.desc}</div>
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
					display_path_default_text='Select backup path'
					dialog_name={dialog_names.input_2}
					dialog_title='Select backup path'
					button_text='select'
					filePath={inputFile_2}
					setFilePath={setInputFile_2}
				/>

				<div className="backup_instead_delete_block">
					<input type="checkbox" id="backup_instead_delete" name="backup_instead_delete" 
						checked={deleteBeatmapsArgs.backup_instead_delete}
						disabled={ status === ActionStatus.processing } 
						onChange={ () => change_args_value('backup_instead_delete', !deleteBeatmapsArgs.backup_instead_delete ) }/>
					<label for="backup_instead_delete">Backup instead delete</label>
				</div>

				<div className="ranked_status_block">
					<label for="ranked_status">Ranked status</label>
					<select id="ranked_status" name="ranked_status" 
						disabled={ status === ActionStatus.processing } 
						onChange={ (e) =>change_args_value( 'ranked_status', e.target.value, true ) }>
						<option value="">Select ranked status</option>
						<option value="0">unknown</option>
						<option value="1">unsubmitted</option>
						<option value="2">pending/wip/graveyard</option>
						<option value="4">ranked</option>
						<option value="5">approved</option>
						<option value="6">qualified</option>
						<option value="7">loved</option>
					</select>
				</div>

				<div className="gamemode_block">
					<label for="gamemode">Gamemode</label>
					<select id="gamemode" name="gamemode" 
						disabled={ status === ActionStatus.processing } 
						onChange={ (e) => change_args_value( 'gamemode', e.target.value, true  ) }>
						<option value="">Select gamemode</option>
						<option value="0">Standard</option>
						<option value="1">Taiko</option>
						<option value="2">Catch The Beat</option>
						<option value="3">Mania</option>
					</select>
				</div>


				<div className="min_number_objects_block">
					<label for="min_number_objects">Минимальное число объектов</label>
					<input type="number" id="min_number_objects" name="min_number_objects"
						disabled={ status === ActionStatus.processing } 
						onChange={ (e) => change_args_value('min_number_objects', e.target.value, true )} />
				</div>

				<div className="min_drain_time_block">
					<label for="min_drain_time">Минимальное время карты</label>
					<input type="number" id="min_drain_time" name="min_drain_time"
						disabled={ status === ActionStatus.processing } 
						onChange={ (e) => change_args_value('min_drain_time', e.target.value, true )} />
				</div>
				
                <div className="min_total_time_block">
					<label for="min_total_time">Минимальное время песни</label>
					<input type="number" id="min_total_time" name="min_total_time"
					disabled={ status === ActionStatus.processing } 
					onChange={ (e) => change_args_value('min_total_time', e.target.value, true )} />
				</div>

				<button 
					disabled={ !inputFile || !inputFile_2 || status === ActionStatus.processing } 
					onClick={PerformAction}>
						Delete Beatmaps
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
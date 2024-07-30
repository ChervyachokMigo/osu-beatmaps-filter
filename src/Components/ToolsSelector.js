import { useContext } from "react"
import { ActionStatusContext, SelectedToolsContext } from "./Contexts/main";
import { ActionStatus, ToolsValues } from "./Consts/main";


export const ToolsSelector = (args) => {
	const {setName} = useContext(SelectedToolsContext);
	const {status} = useContext(ActionStatusContext);
	/*
				<option value="delete_beatmaps">Delete Beatmaps</option>
                <option value="beatmap_info">Beatmap Info</option>
                <option value="beatmap_rank">Beatmap Rank</option>
                <option value="beatmap_download">Beatmap Download</option>
                <option value="beatmap_backup">Beatmap Backup</option>
                <option value="beatmap_move">Beatmap Move</option>
                <option value="beatmap_delete">Beatmap Delete</option>
                <option value="beatmap_export">Beatmap Export</option>
                <option value="beatmap_import">Beatmap Import</option>
                <option value="beatmap_merge">Beatmap Merge</option>
				<option value="beatmap_split">Beatmap Split</option>*/

	
	const tools_tags = Object.values(ToolsValues).map( x => 
		<option value={x.name}>{x.title}</option>
	);

	return (
		<div>
			<select 
				name="tools" 
				disabled={status === ActionStatus.processing} 
				onChange={(e) => setName(e.target.value)}>
					{tools_tags}
			</select>
		</div>
	);
}
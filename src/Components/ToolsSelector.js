import { useContext } from "react"
import { ActionStatusContext, SelectedToolsContext } from "./Contexts/main";
import { ActionStatus, ToolsNames } from "./Consts/main";


export const ToolsSelector = (args) => {
	const {setName} = useContext(SelectedToolsContext);
	const {status} = useContext(ActionStatusContext);
	/*<option value="starrate_fix">Starrate Fix</option>
				<option value="delete_beatmaps">Delete Beatmaps</option>
                <option value="tags_collection">Tags Collection</option>
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
	return (
		<div>
			<select name="tools" disabled={status === ActionStatus.processing} onChange={(e) => {
				setName(e.target.value)}}>
				<option value={ToolsNames.none.name}>{ToolsNames.none.title}</option>
				<option value={ToolsNames.starrate_fix.name}>{ToolsNames.starrate_fix.title}</option>
				<option value={ToolsNames.mania_slider_collections.name}>{ToolsNames.mania_slider_collections.title}</option>
				
			</select>
		</div>
	);
}
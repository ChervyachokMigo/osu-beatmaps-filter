import { useContext, useEffect } from "react"
import { SelectedToolsContext } from "./Contexts/main";


export const ToolsSelector = (args) => {
	const {name, setName} = useContext(SelectedToolsContext);
	
	useEffect( () => {
		console.log('selected tools', name);
	}, [name]);

	return (
		<div>
			<select name="tools" onChange={(e) => {
				setName(e.target.value)}}>
				<option value="">Select a tool</option>
				<option value="starrate_fix">Starrate Fix</option>
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
				<option value="beatmap_split">Beatmap Split</option>
			</select>
		</div>
	);
}
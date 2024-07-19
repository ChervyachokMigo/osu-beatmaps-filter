import { useContext, useEffect } from "react"
import { SelectedToolsContext } from "../Contexts/main";

const saveFile = () => {

	window.showSaveFilePicker(({ 
		suggestedName: "osu!.db", 
		types: [ { accept: {"application/binary": ".db"} } ],
		id: 'osu_db_out',
		startIn: "desktop",
		
	})).then( (v) => {
		console.log(v);
	}).catch( e => console.log('aborted'));

}

export const StarrateFix = (args) => {
	const {name, setName} = useContext(SelectedToolsContext);
	
	useEffect( () => {
		console.log(name);
	}, [name]);

	if (name === 'starrate_fix') {
		return (
			<div className="input-group">
				<label htmlFor="osu_db">
					Select input <b>osu!.db</b>
				</label>
				<input id="osu_db" type="file" accept=".db" />
				<label htmlFor="osu_db_out">
					Select output <b>osu!.db</b>
				</label>
				<button id="osu_db_out" onClick={saveFile}>SAVE AS</button>
			</div>
		);
	} else {
		return null;
	}
}
import { useContext, useEffect, useState } from "react"
import { SelectedToolsContext } from "../Contexts/main";

const { ipcRenderer } = window.require('electron');

export const StarrateFix = (args) => {

	const {name, setName} = useContext(SelectedToolsContext);

	const [inputFile, setInputFile] = useState('');
	const [outputFile, setOutputFile] = useState('');

	const OpenFile = async () => {
		const filepath = (await ipcRenderer.invoke('open-file', {
			title: 'input osu!.db',
			filters: [
				{ name: 'Date Base File', extensions: ['db'] },
            ],
		}) || []).pop() || '';
		setInputFile(filepath);
	};

	const SaveFile = async () => {
		const filepath = await ipcRenderer.invoke('save-file', {
			title: 'outnput osu!.db',
			
            filters: [
				{ name: 'Date Base File', extensions: ['db'] },
            ],
		}) || '';
		setOutputFile(filepath);
	};

	const PerformAction = async () => {
		await ipcRenderer.invoke('starrate-fix', 
			{ input_path: inputFile, output_path: outputFile });
	}

	useEffect( () => {
		
		setInputFile('');
		setOutputFile('');

	}, [name]);

	const empty_input_text = <div>Select input <b>osu!.db</b></div>;
	const empty_output_text = <div>Select output <b>osu!.db</b></div>;

	if (name === 'starrate_fix') {
		return (<div className="starrate_fix_form">
			<div>Description</div>
				<div className="input-group">
					<div>
						{!inputFile? empty_input_text : inputFile}
                    </div>
						
					<button id="osu_db_in" onClick={OpenFile} >Input file</button>

					<div>
						{!outputFile ? empty_output_text : outputFile}
					</div>
					<button id="osu_db_out"  onClick={SaveFile}>Output file</button>
					<button disabled={!inputFile ||!outputFile} onClick={PerformAction}>Fix Starrate</button>
				</div>
			</div>
		);
	} else {
		return null;
	}
}
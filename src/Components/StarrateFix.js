import { useContext, useEffect, useState } from "react"
import { SelectedToolsContext } from "../Contexts/main";

import { OpenFileDialog } from "./OpenFileDialog";
//import FileDialog  from "./FileDialog";
import { SaveFileDialog } from "./OpenFileDialog";

export const StarrateFix = (args) => {

	const {name, setName} = useContext(SelectedToolsContext);
	
	const [openDialogActive, setOpenDialogActive] = useState(false);
	const [inputFile, setInputFile] = useState('');

	const [outputFile, setOutputFile] = useState('');

	const SaveFile = async () => {
		/*const filepath = await ipcRenderer.invoke('save-file', {
			title: 'outnput osu!.db',
			
            filters: [
				{ name: 'Date Base File', extensions: ['db'] },
            ],
		}) || '';
		setOutputFile(filepath);*/
	};

	const PerformAction = async () => {
		/*await ipcRenderer.invoke('starrate-fix', 
			{ input_path: inputFile, output_path: outputFile });*/
	};

	const empty_input_text = "Select input osu!.db";
	const empty_output_text = <div>Select output <b>osu!.db</b></div>;

	/*<button id="osu_db_in" onClick={OpenFile} >Input file</button>
	<button onClick={() => FileDialog('.db', false, (arg) => console.log(arg.target.files))}>test</button>
	<OpenFileDialog setFilepath={setInputFile} defaultText={<div>Select input <b>osu!.db</b></div>} />	
	<div>
		{!outputFile ? empty_output_text : outputFile}
	</div>
	<button id="osu_db_out"  onClick={SaveFile}>Output file</button>
	<button disabled={!inputFile ||!outputFile} onClick={PerformAction}>Fix Starrate</button>	
	*/


	if (name === 'starrate_fix') {
		return (<div className="starrate_fix_form">
			<div className="description">Описание: Инстумент удаляет все сложности из карты в базе с нулевым старрейтом</div>
				<div className="input-group">
					<div className="input_path">
					Input: {!inputFile ? empty_input_text : inputFile}
					</div>

					<button className="input_file_button" onClick={() => setOpenDialogActive(!openDialogActive)}>select</button>

					<OpenFileDialog 
						className="input_file_dialog" 
						title="Select input osu!.db"
						active={openDialogActive} 
						setActive={setOpenDialogActive}
						setSelectedFile={setInputFile}
					/>

					<div className="output_path">
                    Output: {!outputFile? empty_output_text : outputFile}
                    </div>
					<button className="output_file_button" onClick={SaveFile}>select</button>

					
				</div>
			</div>
		);
	} else {
		return null;
	}
}
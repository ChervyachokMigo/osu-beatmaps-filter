import { useEffect, useState } from "react";
import {POST} from "../tools/request_api";

export const OpenFileDialog = (parrent) => {

	const [active, setActive] = useState(false);
	const [filepath, setFilepath] = useState('default_path');
	const [filelist, setFilelist] = useState([]);
	const [selectedFile, setSelectedFile] = useState('')

    const get_filelist = (filename) => {
		POST('get-filelist', {
			path: filename? 
				filepath ? 
					filepath + '\\' + filename:
					filename : 
				filepath, 
			accept_exts: ['.db']}).then( result => {

			setFilepath(result.path);
			setFilelist(result.filelist);

		}).catch( error => {
            console.error(error);
        });
	}

	const select_file = (file) => {
		setSelectedFile(filepath + '\\' + file);
		parrent.setSelectedFile(filepath + '\\' + file);
        parrent.setActive(false);
	}

	const change_filepath = (file) => {
		if (file.directory) {
			get_filelist(file.name);
		} else {
			select_file(file.name);
		}
	}

	useEffect( () => {
		setActive(parrent.active);
	}, [parrent.active]);

	useEffect( () => {
		if (active) get_filelist();
	}, [filepath, active]);

	return (active ?
		<div className="dialog_background">
		<div className={parrent.className}>
			<div className="header">
				<div className="title">{parrent.title}</div>
				<div className="close">
					<button onClick={() => parrent.setActive(false)}>x</button>
				</div>
			</div>
			<div className="current_path">{!filepath? "Drives" : filepath}</div>
			<div className="FileList">{ filelist ? 
				filelist.map( (x, i) =>
					<div className="file" key={i} onClick={() => change_filepath(x)}>
						{x.name == '..' ? ".. (Назад)" : x.name}
					</div>
				): ''}
			</div>
			
		</div>
		</div> : 
		<div className="empty"></div>)
}
import { useContext, useEffect, useState } from "react";
import { POST } from "../tools/request_api";
import { DialogActiveContext } from "./Contexts/main";

export const FileDialog = (parrent) => {
	const {active, setActive} = useContext(DialogActiveContext( parrent ));

	const [filepath, setFilepath] = useState('default_path');
	const [filelist, setFilelist] = useState([]);

    const get_filelist = (filename) => {

		set_visible('filelist_loading');
		set_invisible('filelist');

		POST('get-filelist', {
			path: filename? 
				filepath ? 
					filepath + '\\' + filename:
					filename : 
				filepath, 
			accept_exts: [parrent.accept_ext]}).then( result => {

			setFilepath(result.path);
			setFilelist(result.filelist);

		}).catch( error => {
            console.error(error);
        }).finally( () => {
			set_invisible('filelist_loading');
			set_visible('filelist');
		});
	}

	const set_invisible = (name) => {
		const result = document.getElementsByClassName(name);
		for (const el of result){
			el.classList.add("invisible");
		}
	}
	const set_visible = (name) => {
		const result = document.getElementsByClassName(name);
		for (const el of result){
			el.classList.remove("invisible");
		}
	}

	const change_filepath = (file, event) => {
		if (file.directory) {
			get_filelist(file.name);
		} else {
			if (parrent.type === 'open_file') {
				parrent.onClickFile(filepath + '\\' + file.name);
				setActive(false);
			}
		}
	}

	const onClickOK = () => {
		const filename = document.getElementById('save_filename').value;
		const res = filepath + '\\' + ( filename.endsWith(parrent.accept_ext) ? filename : filename + parrent.accept_ext );
		parrent.onClickOK(res);
		setActive(false);
	}

	useEffect( () => {
		if (active) {
			get_filelist();
		}
	// eslint-disable-next-line
	}, [active, filepath]);

	return (
		active === true ?
		<div className="dialog_background">
			<div className="file_dialog">
				<div className="header">
					<div className="title">{parrent.title}</div>
					<div className="close">
						<button onClick={() => setActive(false)}>x</button>
					</div>
				</div>
				<div className="current_path">{!filepath? "Drives" : filepath}</div>
				<div className="filelist_block">
					<div className="filelist_loading">Loading...</div>
					<div className="filelist invisible">
						{ filelist ? filelist.map( (x, i) =>
							<div className="file" key={i} onClick={(e) => change_filepath(x, e)}>
								{x.name === '..' ? ".. (Назад)" : x.name}
							</div>
						): '< Пусто >'}
					</div>
				</div>
				{ parrent.type === 'save_file' ? 
					<div className="save_block">
						<input id="save_filename" type="text" placeholder="filename"></input>
						<button onClick={() => onClickOK() }>OK</button>
					</div>
				: '' }
			</div>
		</div> : <div className="empty"></div>
	);
}
import { useContext } from "react";
import { FileDialog } from "./FileDialog";
import { DialogActiveContext } from "../Contexts/main";

export const OpenFileDialog = (parrent) => {

	const {active, setActive} = useContext(DialogActiveContext( parrent ));

	const onClose = () => {
		setActive(false);
	}

	const onClickFile = (filepath) => {
		parrent.onClickFile(filepath);
        setActive(false);
	}

	return (
		active ? <div className="dialog_background">
			<FileDialog 
				title={parrent.title}
				onClickFile={onClickFile}
				onClose={onClose}
				accept_ext={parrent.accept_ext}
			/>
		</div> :
		<div className="empty"></div>
	)
}
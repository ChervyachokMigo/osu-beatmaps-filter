import { useContext } from "react";
import { FileDialog } from "./FileDialog";
import { DialogActiveContext } from "../Contexts/main";

export const SaveFileDialog = (parrent) => {

	const {active, setActive} = useContext(DialogActiveContext( parrent ));

	const onClose = () => {
		setActive(false);
	}

	const onClickOK = (filepath) => {
		parrent.onClickOK(filepath);
		setActive(false);
	}

	return (
		active ? <div className="dialog_background">
			<FileDialog 
				title={parrent.title}
				onClickFile={() => {}}
				onClickOK={onClickOK}
				onClose={onClose}
				accept_ext={parrent.accept_ext}
			/>
		</div> :
		<div className="empty"></div>
	)
}
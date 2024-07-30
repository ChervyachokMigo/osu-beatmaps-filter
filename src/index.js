import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ActionStatusProvider, DialogsActiveProvider, DialogsPrepare, SelectedToolsProvider } from './Components/Contexts/main';
import Main from './Components/Main';
import './index.css';
import { dialog_names } from './consts';

DialogsPrepare();

const root = createRoot(document.getElementById('ReactRoot'));

root.render(
	<StrictMode>
		<SelectedToolsProvider>
			<ActionStatusProvider>

				<DialogsActiveProvider dialog_name={dialog_names.input}>
				<DialogsActiveProvider dialog_name={dialog_names.input_2}>
				<DialogsActiveProvider dialog_name={dialog_names.output}>

					<Main />

				</DialogsActiveProvider>
				</DialogsActiveProvider>
				</DialogsActiveProvider>

			</ActionStatusProvider>
		</SelectedToolsProvider>
	</StrictMode>
);
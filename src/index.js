import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ActionStatusProvider, DialogsPrepare, SelectedToolsProvider } from './Components/Contexts/main';
import Main from './Components/Main';
import './index.css';

DialogsPrepare();

const root = createRoot(document.getElementById('ReactRoot'));

root.render(
	<StrictMode>
		<SelectedToolsProvider>
			<ActionStatusProvider>

			<Main />

			</ActionStatusProvider>
		</SelectedToolsProvider>
	</StrictMode>
);
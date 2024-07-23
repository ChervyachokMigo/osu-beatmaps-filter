import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { SelectedToolsProvider } from './Contexts/main';
import Main from './Components/Main';
import './index.css';

const root = createRoot(document.getElementById('ReactRoot'));

root.render(
	<StrictMode>
		<SelectedToolsProvider>
			<Main />
		</SelectedToolsProvider>
	</StrictMode>
);
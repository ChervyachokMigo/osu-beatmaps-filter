import {createRoot} from 'react-dom/client';
import Main from './Components/Main';
import { SelectedToolsProvider } from './Contexts/main';

const root = createRoot(document.getElementById('ReactRoot'));

root.render(
	<SelectedToolsProvider>
		<Main />
	</SelectedToolsProvider>
);

import { createContext,  useState } from 'react'

export const SelectedToolsContext = createContext( '' );

export function SelectedToolsProvider({children}) {
	const [name, setName] = useState('');
	return (<SelectedToolsContext.Provider value={{name, setName}}>{children}</SelectedToolsContext.Provider>);
}

import { createContext,  useState } from 'react'
import { dialog_names } from '../../consts';
import { ActionStatus } from "../Consts/main";

const DialogsActive = [];

export function DialogsPrepare() {
	const values = Object.values(dialog_names);
	for( const name of values) {
		DialogsActive.push({ name, context: createContext( false ) });
	}
}

export function DialogActiveContext(args) {
    const res = DialogsActive.find( x => x.name === args.dialog_name );
	if(res){
		return res.context;
	} else {
		return null;
    }
}

export function DialogsActiveProvider(args) {
	const [active, setActive] = useState(false);
	const context = DialogActiveContext(args);
	return (<context.Provider value={{active, setActive}}>{args.children}</context.Provider>);
}

export const SelectedToolsContext = createContext( '' );

export function SelectedToolsProvider({children}) {
	const [name, setName] = useState('');
	return (<SelectedToolsContext.Provider value={{name, setName}}>{children}</SelectedToolsContext.Provider>);
}

export const ActionStatusContext = createContext( ActionStatus.idle );

export function ActionStatusProvider(args) {
    const [status, setStatus] = useState(ActionStatus.idle);
    return <ActionStatusContext.Provider value={{status, setStatus}}>{args.children}</ActionStatusContext.Provider>;
}
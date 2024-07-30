export const ActionStatus = {
	idle: 0,
	processing: 1,
	finished: 2,
    error: -1,
}

export const PanelValues = {
	input: {
		display_path_prefix_text: 'Input: ',
		file_dialog_type: 'open_file'
    },
	output: {
		display_path_prefix_text: 'Output: ',
		file_dialog_type: 'save_file'
	}
}


export const ToolsNames = {
	none: {
		name: '', 
		title: 'Выбрать инструмент'},
	starrate_fix: {
		name: 'starrate_fix', 
		title: 'Starrate Fix',
		desc: 'Инстумент удаляет все сложности из карты в базе с нулевым старрейтом'},
	mania_slider_collections: {
		name: 'mania_slider_collections', 
		title: 'Mania Slider Collections',
		desc: 'Создает коллекции слайдеров для osu!mania с определенным диапазоном старрейта'},
}
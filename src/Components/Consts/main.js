import { DeleteBeatmaps } from "../ToolsViews/DeleteBeatmaps"
import { ManiaSliderCollections } from "../ToolsViews/ManiaSliderCollections"
import { StarrateFix } from "../ToolsViews/StarrateFix"
import { TagsCollections } from "../ToolsViews/TagsCollections"

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
	},
	dir: {
		display_path_prefix_text: 'Directory: ',
		file_dialog_type: 'dir'
	}
}


export const ToolsValues = {
	none: {
		name: '', 
		title: 'Выбрать инструмент',
		desc: '',
		tag: ''
	},
	starrate_fix: {
		name: 'starrate_fix', 
		title: 'Starrate Fix',
		desc: 'Удаляет все сложности из карты в базе с нулевым старрейтом',
		tag: <StarrateFix />
	},
	mania_slider_collections: {
		name: 'mania_slider_collections', 
		title: 'Mania Slider Collections',
		desc: 'Создает коллекции слайдеров для osu!mania с определенным диапазоном старрейта',
		tag: <ManiaSliderCollections />
	},
	tags_collections: {
		name: 'tags_collections', 
        title: 'Tags Collections',
        desc: 'Создает коллекции тегов для всех карт из базы osu',
		tag: <TagsCollections />
	},
	delete_beatmaps: {
		name: 'delete_beatmaps', 
        title: 'Delete Beatmaps',
		desc: 'Удаляет карты по заданным критериям (только карты, без дополнительных файлов)',
		tag: <DeleteBeatmaps />
	}
}
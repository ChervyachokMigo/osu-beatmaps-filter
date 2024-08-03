
import { DeleteBeatmaps } from "../ToolsViews/DeleteBeatmaps"
import { FindMissedBeatmaps } from "../ToolsViews/FindMissedBeatmaps"
import { ManiaSliderCollections } from "../ToolsViews/ManiaSliderCollections"
import { ScoresConcat } from "../ToolsViews/ScoresConcat"
import { StarrateCalculationProgress } from "../ToolsViews/StarrateCalculationProgress"
import { StarrateConcat } from "../ToolsViews/StarrateConcat"
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

export const dialog_names = {
	input: 'input_dialog',
	input_2: 'input_2_dialog',
	output: 'output_dialog',
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
	},
	find_missed_beatmaps: {
		name: 'find_missed_beatmaps', 
        title: 'Find Missed Beatmaps',
        desc: 'Находит отсутствующие карты из коллекций osu',
        tag: <FindMissedBeatmaps />
	},
	scores_concat: {
		name:'scores_concat', 
        title: 'Scores Concat',
        desc: 'Соединяет 2 базы со скорами в одну',
        tag: <ScoresConcat />
	},
	starrate_concat: {
		name:'starrate_concat', 
        title: 'Starrate Concat',
        desc: 'Добавляет старрейты в osu!.db из второй базы',
        tag: <StarrateConcat />
	},
	starrate_calculation_progress: {
		name:'starrate_calculation_progress', 
        title: 'Starrate Calculation Progress',
        desc: 'Отображает прогресс расчета старрейта',
        tag: <StarrateCalculationProgress />
	}
    
}

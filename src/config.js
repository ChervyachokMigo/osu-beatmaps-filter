/*export enum RankedStatus {
    unknown = 0, 
    unsubmitted = 1, 
    pending = 2,
    wip = 2,
    graveyard = 2, 
    unused = 3, 
    ranked = 4, 
    approved = 5, 
    qualified = 6, 
    loved = 7
}*/

/*export enum Gamemode {
    osu = 0, 
    taiko = 1, 
    catch = 2, 
    mania = 3
}*/

module.exports = {
	osu_path: 'D:\\osu!',
	backup_folder: 'Songs_backup',

	conf_delete_beatmaps: {
		//min_number_objects: 30,
		//min_drain_time: 30,
		//min_total_time: 30,
		//ranked_status: 2,
		//gamemode: 1,
		backup_instead_delete: true
	}
}
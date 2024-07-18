const path = require('path');
const { osu_db_load, beatmap_property, collection_db_save, collection_db_load } = require("osu-tools");
const { osu_path } = require('../config.js');


const beatmap_props = [
	beatmap_property.beatmap_md5,
	beatmap_property.gamemode,
	beatmap_property.tags
];

const osu_db_beatmaps = osu_db_load(path.join(osu_path, 'osu!.db'), beatmap_props);

const exclude_tags = [
	'',
	'-'
];

let beatmaps_tags = [];

const tag_add = (name) => {
	const idx = beatmaps_tags.findIndex( x => x.name === name );
	idx > -1 ? beatmaps_tags[idx].count++ : beatmaps_tags.push({ name, count: 1 });
};

osu_db_beatmaps.beatmaps.map( x => x.tags.length > 0 ? x.tags.split(' ').map( name => tag_add(name)) : null );

beatmaps_tags = beatmaps_tags.filter( x => x.count > 10 );

beatmaps_tags.sort( (a, b) => b.count - a.count );

console.log(beatmaps_tags)

for(let i = 0; i < beatmaps_tags.length; i++){
	const beatmaps = osu_db_beatmaps.beatmaps.filter( x => x.tags.length > 0 && x.tags.indexOf(beatmaps_tags[i].name) > -1 ).map( x => x.beatmap_md5 );
	beatmaps_tags[i].name = `!!tag: ${beatmaps_tags[i].name}`;
	beatmaps_tags[i].beatmaps_md5 = beatmaps;
}

const collections = collection_db_load( path.join(osu_path, 'collection.db'));

collections.collections = collections.collections.concat(beatmaps_tags);

collection_db_save ( collections, 'collection.db' );
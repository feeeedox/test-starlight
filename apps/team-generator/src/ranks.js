/**
 * Rank definitions with their properties
 */
export const Rank = {
    administrator: { value: 161, inTeam: true, cssClass: 'administrator', male: 'Administrator', female: 'Administratorin', description: 'rank.administrator.description' },
    administrator_city: { value: 160, inTeam: true, cssClass: 'administrator', male: 'Administrator City', female: null, description: null },
    builder: { value: 80, inTeam: true, cssClass: 'builder', male: 'Builder', female: 'Builderin', description: 'rank.builder.description' },
    builder_plus: { value: 85, inTeam: true, cssClass: 'builder-plus', male: 'Builder+', female: null, description: 'rank.builder_plus.description' },
    creator: { value: 70, inTeam: true, cssClass: 'creator', male: 'Creator', female: null, description: null },
    content_plus: { value: 75, inTeam: true, cssClass: 'content-plus', male: 'Content+', female: null, description: 'rank.content_plus.description' },
    content: { value: 71, inTeam: true, cssClass: 'content', male: 'Content', female: null, description: 'rank.content.description' },
    developer: { value: 135, inTeam: true, cssClass: 'developer', male: 'Developer', female: null, description: 'rank.developer.description' },
    developer_city: { value: 131, inTeam: true, cssClass: 'developer', male: 'Developer City', female: null, description: null },
    developer_games: { value: 130, inTeam: true, cssClass: 'developer', male: 'Developer Games', female: null, description: null },
    developer_plus: { value: 140, inTeam: true, cssClass: 'developer-plus', male: 'Developer+', female: null, description: 'rank.developer_plus.description' },
    expert: { value: 50, inTeam: false, cssClass: 'expert', male: 'Expert', female: null, description: null },
    head_builder: { value: 90, inTeam: true, cssClass: 'headbuilder', male: 'HeadBuilder', female: null, description: 'rank.head_builder.description' },
    mvp: { value: 30, inTeam: false, cssClass: 'mvp', male: 'MVP', female: null, description: null },
    mvp_plus: { value: 40, inTeam: false, cssClass: 'mvp', male: 'MVP+', female: null, description: null },
    management: { value: 180, inTeam: true, cssClass: 'management', male: 'Management', female: null, description: null },
    moderator: { value: 125, inTeam: true, cssClass: 'moderator', male: 'Moderator', female: 'Moderatorin', description: 'rank.moderator.description' },
    moderator_city: { value: 121, inTeam: true, cssClass: 'moderator', male: 'Moderator City', female: null, description: null },
    moderator_games: { value: 120, inTeam: true, cssClass: 'moderator', male: 'Moderator Games', female: 'Moderatorin Games', description: null },
    native_expert: { value: 55, inTeam: false, cssClass: 'expert', male: 'Native Expert', female: null, description: null },
    native_mvp: { value: 35, inTeam: false, cssClass: 'mvp', male: 'Native MVP', female: null, description: null },
    native_mvp_plus: { value: 45, inTeam: false, cssClass: 'mvp', male: 'Native MVP+', female: null, description: null },
    native_youtuber: { value: 60, inTeam: false, cssClass: 'youtuber', male: 'Native YouTuber', female: null, description: null },
    youtuber: { value: 59, inTeam: false, cssClass: 'youtuber', male: 'YouTuber', female: null, description: null },
    pro: { value: 10, inTeam: false, cssClass: 'pro', male: 'Pro', female: null, description: null },
    pro_plus: { value: 20, inTeam: false, cssClass: 'pro', male: 'Pro+', female: null, description: null },
    spieler: { value: 0, inTeam: false, cssClass: 'user', male: 'Spieler', female: 'Spielerin', description: null },
    supporter: { value: 105, inTeam: true, cssClass: 'supporter', male: 'Supporter', female: 'Supporterin', description: 'rank.supporter.description' },
    supporter_city: { value: 102, inTeam: true, cssClass: 'supporter', male: 'Supporter City', female: 'Supporterin City', description: null },
    supporter_games: { value: 101, inTeam: true, cssClass: 'supporter', male: 'Supporter Games', female: 'Supporterin Games', description: null },
    supporter_plus: { value: 110, inTeam: true, cssClass: 'supporter-plus', male: 'Supporter+', female: 'Supporterin+', description: 'rank.supporter_plus.description' },
    supporter_city_games: { value: 100, inTeam: true, cssClass: 'supporter', male: 'Supporter City & Games', female: 'Supporterin City & Games', description: null },
    sysadmin: { value: 150, inTeam: true, cssClass: 'sysadmin', male: 'SysAdmin', female: null, description: 'rank.sysadmin.description' }
};

/**
 * Get rank by name
 */
export function getRank(name) {
    return Rank[name];
}

/**
 * Get rank display name based on sex
 */
export function getRankString(rank, sex) {
    if (sex === 'female' && rank.female) {
        return rank.female;
    }
    return rank.male;
}

/**
 * Get all ranks sorted by value (descending)
 */
export function getAllRanksSorted() {
    return Object.values(Rank)
        .filter(r => r.description !== null)
        .sort((a, b) => b.value - a.value);
}

/**
 * Compare two ranks by value
 */
export function compareRanks(rankA, rankB) {
    return rankB.value - rankA.value;
}
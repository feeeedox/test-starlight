import { Teamler } from '../teamler.js';

/**
 * Generate rank changes page content, grouped by month
 */
export function generateChangesPage(teamlers) {
    let content = '';

    content += '%page.rank-change.first%\n\n';

    const allChanges = [];

    for (const teamler of teamlers) {
        const changes = teamler.getRankChanges(false);
        allChanges.push(...changes);
    }

    allChanges.sort((a, b) => {
        const dateA = Teamler.parseDate(a.date);
        const dateB = Teamler.parseDate(b.date);
        return dateB - dateA;
    });

    const monthGroups = new Map();

    for (const change of allChanges) {
        const date = Teamler.parseDate(change.date);
        const monthKey = `${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;
        if (!monthGroups.has(monthKey)) {
            monthGroups.set(monthKey, []);
        }
        monthGroups.get(monthKey).push(change);
    }

    for (const [monthKey, changes] of monthGroups) {
        content += `## ${monthKey}\n\n`;
        content += `| %player% | %page.rank-change.rank-previous% | %page.rank-change.rank-new% | %date% |\n`;
        content += `|----------|----------------------------------|----------------------------|-------|\n`;

        for (const change of changes) {
            const playerName = change.name.replace(/_/g, '\\_');
            const rankFrom = change.rankFrom ? change.rankFrom.male : '-';
            const rankTo = change.rankTo ? change.rankTo.male : '-';

            content += `| ${playerName} | <span class='${change.rankFrom.cssClass}'>${rankFrom}</span> | <span class='${change.rankTo.cssClass}'>${rankTo}</span> | ${change.date} |\n`;
        }

        content += '\n';
    }

    return content;
}
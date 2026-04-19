import { getAllRanksSorted, getRankString } from '../ranks.js';

/**
 * Generate team members page content
 */
export function generateMembersPage(teamlers) {
    const currentTeam = teamlers
        .filter(t => t.getRankCurrent().inTeam)
        .sort((a, b) => a.constructor.compare(a, b));

    const ranks = getAllRanksSorted();

    let content = '';

    content += `%page.members.first-1% ${currentTeam.length} %page.members.first-2% `;

    const rankStrings = ranks.map(rank => `<span class="${rank.cssClass}">${rank.male}</span>`);
    for (let i = 0; i < rankStrings.length; i++) {
        content += rankStrings[i];
        if (i < rankStrings.length - 2) {
            content += ', ';
        } else if (i === rankStrings.length - 2) {
            content += ' %and% ';
        }
    }
    content += ' %page.members.first-3%\n\n';
    content += '%page.members.first-4%\n\n';
    content += '![%page.members.first-5%](/images/rank-structure.png)\n\n';

    for (const rank of ranks) {
        const teamlersInRank = currentTeam.filter(t => t.getRankCurrent() === rank);

        if (teamlersInRank.length === 0) {
            continue;
        }

        content += `## ${rank.male}\n\n`;
        content += `%${rank.description}%\n\n`;

        for (const teamler of teamlersInRank) {
            content += `### <strong><span class="${rank.cssClass}">${teamler.getNameForMarkdown()}</span></strong>\n`;
            content += `- <u>%page.members.rank-ingame%:</u> ${getRankString(rank, teamler.sex)}\n`;

            if (teamler.responsibilitiesMain && teamler.responsibilitiesMain.length > 0) {
                const sorted = [...teamler.responsibilitiesMain].sort((a, b) =>
                    a.toLowerCase().localeCompare(b.toLowerCase())
                );
                content += `- <u>%page.members.hv%:</u> ${sorted.join(', ')}\n`;
            }

            if (teamler.responsibilitiesSecondary && teamler.responsibilitiesSecondary.length > 0) {
                const sorted = [...teamler.responsibilitiesSecondary].sort((a, b) =>
                    a.toLowerCase().localeCompare(b.toLowerCase())
                );
                content += `- <u>%page.members.nv%:</u> ${sorted.join(', ')}\n`;
            }

            if (teamler.fields && teamler.fields.length > 0) {
                const sorted = [...teamler.fields].sort((a, b) =>
                    a.toLowerCase().localeCompare(b.toLowerCase())
                );
                content += `- <u>%page.members.fields%:</u> ${sorted.join(', ')}\n`;
            }

            content += '\n';
        }
    }

    return content;
}
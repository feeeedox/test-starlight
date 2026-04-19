/**
 * Generate responsibilities page content
 */
export function generateResponsibilitiesPage(teamlers) {
    let content = '';

    content += '%page.responsibilities.info%\n\n';

    const categories = [
        {
            title: '%page.responsibilities.project-team-orga%',
            responsibilities: [
                {
                    key: 'teamleader',
                    title: '%page.responsibilities.teamleader%',
                    description: '%page.responsibilities.teamleader.desc%',
                    customTable: true,
                    customTableTitle: '%page.responsibilities.custom.teamleader.title%',
                    customEntries: [
                        { responsibility: 'Management', display: '%page.responsibilities.custom.teamleader.whole-team%' },
                        { responsibility: 'Management des Bau-Teams', display: '%page.responsibilities.custom.teamleader.builder%' },
                        { responsibility: 'Management des Content-Teams', display: '%page.responsibilities.custom.teamleader.content%' },
                        { responsibility: 'Management des Development-Teams', display: '%page.responsibilities.custom.teamleader.development%' },
                        { responsibility: 'Management des Support-Teams', display: '%page.responsibilities.custom.teamleader.support%' }
                    ]
                },
                {
                    key: 'apply.builder',
                    title: '%page.responsibilities.project-team-orga.apply.builder%',
                    description: null,
                    responsibility: 'Teamlerauswahl Builder und Timolia Creative'
                },
                {
                    key: 'apply.content',
                    title: '%page.responsibilities.project-team-orga.apply.content%',
                    description: null,
                    responsibility: 'Teamlerauswahl Content'
                },
                {
                    key: 'apply.development',
                    title: '%page.responsibilities.project-team-orga.apply.development%',
                    description: null,
                    responsibility: 'Teamlerauswahl Development'
                },
                {
                    key: 'apply.support',
                    title: '%page.responsibilities.project-team-orga.apply.support%',
                    description: '%page.responsibilities.project-team-orga.apply.support.desc%',
                    responsibility: 'Teamlerauswahl Support'
                },
                {
                    key: 'howto',
                    title: '%page.responsibilities.project-team-orga.howto%',
                    description: '%page.responsibilities.project-team-orga.howto.desc%',
                    responsibility: 'Timolia HowTo'
                },
                {
                    key: 'tournament',
                    title: '%page.responsibilities.project-team-orga.tournament%',
                    description: '%page.responsibilities.project-team-orga.tournament.desc%',
                    responsibility: 'Timolia Turnier Organisation'
                },
                {
                    key: 'uhc',
                    title: '%page.responsibilities.project-team-orga.uhc%',
                    description: '%page.responsibilities.project-team-orga.uhc.desc%',
                    responsibility: 'UHC'
                },
                {
                    key: 'youtuber',
                    title: '%page.responsibilities.project-team-orga.youtuber%',
                    description: '%page.responsibilities.project-team-orga.youtuber.desc%',
                    responsibility: 'Youtuber-Ränge'
                },
                {
                    key: 'jumpworld',
                    title: '%page.responsibilities.project-team-orga.jumpworld%',
                    description: '%page.responsibilities.project-team-orga.jumpworld.desc%',
                    responsibility: 'JumpWorld Organization'
                },
                {
                    key: 'castles',
                    title: '%page.responsibilities.project-team-orga.castles%',
                    description: '%page.responsibilities.project-team-orga.castles.desc%',
                    responsibility: 'Castles Organization'
                },
                {
                    key: 'freebuild',
                    title: '%page.responsibilities.project-team-orga.freebuild%',
                    description: '%page.responsibilities.project-team-orga.freebuild.desc%',
                    responsibility: 'Freebuild Organization'
                }
            ]
        },
        {
            title: '%page.responsibilities.communication-platforms%',
            responsibilities: [
                {
                    key: 'community-discord',
                    title: '%page.responsibilities.communication-platforms.community-discord%',
                    description: '%page.responsibilities.communication-platforms.community-discord.desc%',
                    responsibility: 'Community-Discord'
                },
                {
                    key: 'socialmedia',
                    title: '%page.responsibilities.communication-platforms.socialmedia%',
                    description: '%page.responsibilities.communication-platforms.socialmedia.desc%',
                    responsibility: 'Social Media'
                }
            ]
        },
        {
            title: '%page.responsibilities.other-responsibilities%',
            responsibilities: [
                {
                    key: 'translations',
                    title: '%page.responsibilities.other-responsibilities.translations%',
                    description: null,
                    responsibility: 'Translations'
                },
                {
                    key: 'gamedesign',
                    title: '%page.responsibilities.other-responsibilities.gamedesign%',
                    description: null,
                    responsibility: 'Gamedesign'
                },
                {
                    key: 'map-submissions',
                    title: '%page.responsibilities.other-responsibilities.map-submissions%',
                    description: null,
                    responsibility: 'Map-Einsendungen'
                },
                {
                    key: 'graphicdesign',
                    title: '%page.responsibilities.other-responsibilities.graphicdesign%',
                    description: null,
                    responsibility: 'Grafikdesign'
                },
                {
                    key: 'announcements',
                    title: '%page.responsibilities.other-responsibilities.announcements%',
                    description: null,
                    responsibility: 'Ankündigungen'
                },
                {
                    key: 'monthly-winner',
                    title: '%page.responsibilities.other-responsibilities.monthly-winner%',
                    description: null,
                    responsibility: 'Monatssieger'
                }
            ]
        }
    ];

    for (const category of categories) {
        content += `## ${category.title}\n\n`;

        for (const resp of category.responsibilities) {
            if (resp.customTable) {
                content += `### ${resp.title}\n\n`;

                if (resp.description) {
                    content += `${resp.description}\n\n`;
                }

                if (resp.customNote) {
                    content += `${resp.customNote}\n\n`;
                }

                const rows = [];

                if (resp.customEntries) {
                    for (const entry of resp.customEntries) {
                        if (entry.split) {
                            const hvTeamlers = findTeamlersWithResponsibility(teamlers, entry.hvKey);
                            const nvTeamlers = findTeamlersWithResponsibility(teamlers, entry.nvKey);
                            if (hvTeamlers.length > 0) {
                                rows.push({ names: hvTeamlers, label: entry.hvDisplay });
                            }
                            if (nvTeamlers.length > 0) {
                                rows.push({ names: nvTeamlers, label: entry.nvDisplay });
                            }
                        } else {
                            const found = findTeamlersWithResponsibility(teamlers, entry.responsibility);
                            if (found.length > 0) {
                                rows.push({ names: found, label: entry.display });
                            }
                        }
                    }
                } else {
                    const hvTeamlers = findTeamlersWithMainResponsibility(teamlers, resp.responsibility);
                    const nvTeamlers = findTeamlersWithSecondaryResponsibility(teamlers, resp.responsibility);
                    if (hvTeamlers.length > 0) {
                        rows.push({ names: hvTeamlers, label: '%page.responsibilities.hv%' });
                    }
                    if (nvTeamlers.length > 0) {
                        rows.push({ names: nvTeamlers, label: '%page.responsibilities.nv%' });
                    }
                }

                if (rows.length > 0) {
                    content += `| %page.responsibilities.teamler% | ${resp.customTableTitle} |\n`;
                    content += '|--------------------------------|------------------------|\n';
                    for (const row of rows) {
                        const names = row.names.map(t => nameWithColor(t)).join(', ');
                        content += `| ${names} | ${row.label} |\n`;
                    }
                    content += '\n';
                }

                content += '\n';
            } else {
                // Regular responsibility: only show if someone is assigned
                const hvTeamlers = findTeamlersWithMainResponsibility(teamlers, resp.responsibility);
                const nvTeamlers = findTeamlersWithSecondaryResponsibility(teamlers, resp.responsibility);

                if (hvTeamlers.length === 0 && nvTeamlers.length === 0) {
                    continue; // Skip — no one assigned
                }

                content += `### ${resp.title}\n\n`;

                if (resp.description) {
                    content += `${resp.description}\n\n`;
                }

                // Use a table for HV/NV
                content += `| %page.responsibilities.teamler% | %page.responsibilities.responsib% |\n`;
                content += '|--------------------------------|-----------------------------------|\n';

                for (const t of hvTeamlers) {
                    content += `| ${nameWithColor(t)} | %page.responsibilities.hv% |\n`;
                }
                for (const t of nvTeamlers) {
                    content += `| ${nameWithColor(t)} | %page.responsibilities.nv% |\n`;
                }

                content += '\n\n';
            }
        }
    }

    return content;
}

/**
 * Render a teamler name as a colored span using their rank CSS class
 */
function nameWithColor(teamler) {
    const rank = teamler.getRankCurrent();
    const cssClass = rank ? rank.cssClass : 'user';
    return `<span class="${cssClass}">${teamler.getNameForMarkdown()}</span>`;
}

/**
 * Find teamlers with main responsibility
 */
function findTeamlersWithMainResponsibility(teamlers, responsibility) {
    return teamlers
        .filter(t => t.getRankCurrent().inTeam)
        .filter(t => t.hasResponsibilityMain(responsibility))
        .sort((a, b) => a.constructor.compare(a, b));
}

/**
 * Find teamlers with secondary responsibility
 */
function findTeamlersWithSecondaryResponsibility(teamlers, responsibility) {
    return teamlers
        .filter(t => t.getRankCurrent().inTeam)
        .filter(t => t.hasResponsibilitySecondary(responsibility))
        .sort((a, b) => a.constructor.compare(a, b));
}

/**
 * Find teamlers with any type of responsibility (checking both main and secondary)
 */
function findTeamlersWithResponsibility(teamlers, responsibility) {
    return teamlers
        .filter(t => t.getRankCurrent().inTeam)
        .filter(t => t.hasResponsibilityMain(responsibility) || t.hasResponsibilitySecondary(responsibility))
        .sort((a, b) => a.constructor.compare(a, b));
}
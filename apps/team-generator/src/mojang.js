import fetch from 'node-fetch';

/**
 * Service to fetch Minecraft player names from Mojang API
 */

const MOJANG_API_URL = 'https://sessionserver.mojang.com/session/minecraft/profile/';
const REQUEST_DELAY = 100;

/**
 * Sleep function for rate limiting
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Remove dashes from UUID
 */
function formatUUID(uuid) {
    return uuid.replace(/-/g, '');
}

/**
 * Fetch player name from Mojang API
 */
export async function getNameFromMojang(uuid) {
    try {
        const formattedUUID = formatUUID(uuid);
        const response = await fetch(`${MOJANG_API_URL}${formattedUUID}`);

        if (!response.ok) {
            console.warn(`Failed to fetch name for UUID ${uuid}: ${response.status}`);
            return null;
        }

        const data = await response.json();
        return data.name || null;
    } catch (error) {
        console.error(`Error fetching name for UUID ${uuid}:`, error.message);
        return null;
    }
}

/**
 * Update names for all team members
 */
export async function updateTeamlerNames(teamlers) {
    console.log(`Updating names for ${teamlers.length} team members...`);

    for (let i = 0; i < teamlers.length; i++) {
        const teamler = teamlers[i];

        const name = await getNameFromMojang(teamler.uuid);

        if (name) {
            teamler.name = name;
            console.log(`[${i + 1}/${teamlers.length}] Updated: ${name} (${teamler.uuid})`);
        } else {
            console.warn(`[${i + 1}/${teamlers.length}] Could not fetch name for ${teamler.uuid}, keeping as "${teamler.name}"`);
        }

        if (i < teamlers.length - 1) {
            await sleep(REQUEST_DELAY);
        }
    }

    console.log('Name update complete!');
}
import { getRank, getRankString, compareRanks } from './ranks.js';

/**
 * Represents a team member with their history and responsibilities
 */
export class Teamler {
    constructor(data) {
        this.uuid = data.uuid;
        this.sex = data.sex || 'male';
        this.responsibilitiesMain = data.responsibilities_main || [];
        this.responsibilitiesSecondary = data.responsibilities_secondary || [];
        this.fields = data.fields || [];
        this.rankHistory = data.rank_history || {};
        this.name = data.name || 'Unknown';
        this._rankCurrent = null;
    }

    /**
     * Get name escaped for Markdown
     */
    getNameForMarkdown() {
        return this.name.replace(/_/g, '\\_');
    }

    /**
     * Parse date string to Date object
     */
    static parseDate(dateString) {
        if (dateString === 'initial') {
            return new Date(0);
        }
        const cleanDate = dateString.replace('hidden-', '');
        const [day, month, year] = cleanDate.split('.');
        return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    }

    /**
     * Format date to DD.MM.YYYY
     */
    static formatDate(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    }

    /**
     * Get all rank changes for this team member
     */
    getRankChanges(includeHidden = false) {
        const changes = [];
        if (!this.rankHistory || Object.keys(this.rankHistory).length === 0) {
            return changes;
        }

        const dates = Object.keys(this.rankHistory)
            .map(key => key.replace('hidden-', ''))
            .map(dateStr => Teamler.parseDate(dateStr))
            .sort((a, b) => a - b);

        for (let i = 1; i < dates.length; i++) {
            const dateOld = dates[i - 1];
            const dateNew = dates[i];

            const dateOldStr = Teamler.formatDate(dateOld);
            const dateNewStr = Teamler.formatDate(dateNew);

            let rankOldKey = dateOldStr === '01.01.1970' ? 'initial' : dateOldStr;
            let rankNewKey = dateNewStr === '01.01.1970' ? 'initial' : dateNewStr;

            if (!this.rankHistory[rankOldKey] && this.rankHistory[`hidden-${rankOldKey}`]) {
                rankOldKey = `hidden-${rankOldKey}`;
            }

            let hidden = false;
            if (!this.rankHistory[rankNewKey] && this.rankHistory[`hidden-${rankNewKey}`]) {
                rankNewKey = `hidden-${rankNewKey}`;
                hidden = true;
            }

            const rankOld = getRank(this.rankHistory[rankOldKey]);
            const rankNew = getRank(this.rankHistory[rankNewKey]);

            if (includeHidden || (!hidden && rankNewKey !== 'initial')) {
                changes.push({
                    name: this.name,
                    uuid: this.uuid,
                    rankFrom: rankOld,
                    rankTo: rankNew,
                    date: dateNewStr,
                    hidden: hidden
                });
            }
        }

        return changes;
    }

    /**
     * Get current rank of the team member
     */
    getRankCurrent() {
        if (this._rankCurrent === null) {
            const changes = this.getRankChanges(true);
            if (changes.length > 0) {
                this._rankCurrent = changes[changes.length - 1].rankTo;
            } else {
                const initialRankName = this.rankHistory['initial'];
                this._rankCurrent = getRank(initialRankName) || getRank('spieler');
            }
        }
        return this._rankCurrent;
    }

    /**
     * Compare two team members (by rank, then by name)
     */
    static compare(a, b) {
        const rankA = a.getRankCurrent();
        const rankB = b.getRankCurrent();

        if (rankA !== rankB) {
            return compareRanks(rankA, rankB);
        }

        return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    }

    /**
     * Check if team member has a main responsibility
     */
    hasResponsibilityMain(responsibility) {
        return this.responsibilitiesMain.includes(responsibility) ||
            this.responsibilitiesMain.includes(`${responsibility} Forum`);
    }

    /**
     * Check if team member has a secondary responsibility
     */
    hasResponsibilitySecondary(responsibility) {
        return this.responsibilitiesSecondary.includes(responsibility) ||
            this.responsibilitiesSecondary.includes(`${responsibility} Forum`);
    }
}
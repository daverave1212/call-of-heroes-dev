

export class SetConfig {
    constructor({ name, id }) {
        this.name = name
        this.id = id

        const today = new Date().toISOString().split('T')[0]
        this.versions = {
            races: today,
            classes: today,
        }
    }
}
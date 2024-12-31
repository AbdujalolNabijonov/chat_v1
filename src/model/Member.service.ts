export default class Member {
    constructor() { }

    public async createMember(): Promise<string> {
        try {
            return "new Member"
        } catch (err: any) {
            throw err
        }
    }
}
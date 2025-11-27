class DisputeController {
    constructor() {
        this.disputes = [
             {
                id: 1,
                jobId: 2,
                reason: "Freelancer did not deliver on time",
                status: "Open",
                date: "2023-10-25"
            }
        ];
    }

    async getDisputes() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.disputes);
            }, 500);
        });
    }

    async createDispute(data) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newDispute = {
                    id: this.disputes.length + 1,
                    ...data,
                    status: "Open",
                    date: new Date().toISOString().split('T')[0]
                };
                this.disputes.push(newDispute);
                resolve({ success: true, dispute: newDispute });
            }, 800);
        });
    }
}

export const disputeController = new DisputeController();

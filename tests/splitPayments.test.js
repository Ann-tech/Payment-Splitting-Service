const request = require('supertest');
const app = require('../src/app');

const transactions = require('./fixtures/transactions.json');


describe("test /split-payments/compute endpoint", () => {
    it ("should return 200 OK response, split values and balance info for valid trasactions", async () => {
        const validTransaction = transactions[0];
        const response = await request(app).post("/split-payments/compute")
                .send(validTransaction)
                .expect(200)
                .expect("Content-Type", /json/);

        const validTransactionResponse = {
            "ID": 13092,
            "Balance": 0,
            "SplitBreakdown": [
                {
                    "SplitEntityId": "SCRACC0019",
                    "Amount": 450
                },
                {
                    "SplitEntityId": "SCRACC0011",
                    "Amount": 2450
                },
                {
                    "SplitEntityId": "SCRACC0015",
                    "Amount": 48
                },
                {
                    "SplitEntityId": "SCRACC0215",
                    "Amount": 155.2
                },
                {
                    "SplitEntityId": "SCRACC0011",
                    "Amount": 838.08
                },
                {
                    "SplitEntityId": "SCRACC0016",
                    "Amount": 558.72
                }
            ]
        }
         
        expect(response.body).toHaveProperty("ID");
        expect(response.body).toHaveProperty("Balance");
        expect(response.body).toHaveProperty("SplitBreakdown");
        expect(response.body.SplitBreakdown).toStrictEqual(validTransactionResponse);  
        expect(response.body.success).toBe(true);
    })

    it ("should return 400 Bad request for invalid transactions", async () => {
        const invalidTransaction = transactions[1];
        const response = await request(app).post("/split-payments/compute")
                .send(invalidTransaction)
                .expect(400)
                .expect("Content-Type", /json/);

        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("Please provide all required fields");
    })
})

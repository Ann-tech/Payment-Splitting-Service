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
                "SplitEntityId": "SCRACC0029",
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
                "Amount": 838.0799999999999
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
        expect(response.body).toMatchObject(validTransactionResponse);  
        expect(response.body.success).toBe(true);
    })

    it ("should return 400 Bad request for missing properties", async () => {
        const invalidTransaction = transactions[1];
        const response = await request(app).post("/split-payments/compute")
                .send(invalidTransaction)
                .expect(400)
                .expect("Content-Type", /json/);

        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("Please provide all required fields");
    })

    it ("should return 400 Bad request for invalid ID", async () => {
        const invalidTransaction = transactions[2];
        const response = await request(app).post("/split-payments/compute")
                .send(invalidTransaction)
                .expect(400)
                .expect("Content-Type", /json/);

        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("\"ID\" field must be a number.");
    })

    it ("should return 400 Bad request if number of entities in SplitInfo is less than 1", async () => {
        const invalidTransaction = transactions[3];
        const response = await request(app).post("/split-payments/compute")
                .send(invalidTransaction)
                .expect(400)
                .expect("Content-Type", /json/);

        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("\"SplitInfo\" must contain at least 1 items");
    })

    it ("should return 400 Bad request for if number of entities in SplitInfo is more than 20", async () => {
        const invalidTransaction = transactions[4];
        const response = await request(app).post("/split-payments/compute")
                .send(invalidTransaction)
                .expect(400)
                .expect("Content-Type", /json/);

        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("\"SplitInfo\" must contain less than or equal to 20 items");
    })
    
    it ("should return 400 Bad request for invalid Emails", async () => {
        const invalidTransaction = transactions[5];
        const response = await request(app).post("/split-payments/compute")
                .send(invalidTransaction)
                .expect(400)
                .expect("Content-Type", /json/);

        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("CustomerEmail must be a valid email address.");
    })

    it ("should return 400 Bad request for invalid SplitType", async () => {
        const invalidTransaction = transactions[6];
        const response = await request(app).post("/split-payments/compute")
                .send(invalidTransaction)
                .expect(400)
                .expect("Content-Type", /json/);

        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("\"SplitInfo[0].SplitType\" must be one of [FLAT, PERCENTAGE, RATIO]");
    })

    it ("should return 400 Bad request if split Amount of any Entity is less than 0", async () => {
        const invalidTransaction = transactions[7];
        const response = await request(app).post("/split-payments/compute")
                .send(invalidTransaction)
                .expect(400)
                .expect("Content-Type", /json/);

        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("Split amount cannot be less than 0");
    })

    it ("should return 400 Bad request if split Amount of any Entity is greater than transaction amount", async () => {
        const invalidTransaction = transactions[8];
        const response = await request(app).post("/split-payments/compute")
                .send(invalidTransaction)
                .expect(400)
                .expect("Content-Type", /json/);

        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("Split amount cannot be greater than transaction Amount");
    })

    it ("should return 400 Bad request if final Balance is less than 0", async () => {
        const invalidTransaction = transactions[9];
        const response = await request(app).post("/split-payments/compute")
                .send(invalidTransaction)
                .expect(400)
                .expect("Content-Type", /json/);

        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("Final Balance cannot be less than 0.");
    })
})

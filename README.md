# Payment-Splitting-Service
An application which splits a specific payment amount to several defined entities and updates balance

## Development

### Prerequisites

- [Node.js]
- [Express]

#### Clone this repo

```sh
git clone https://github.com/Ann-tech/Payment-Splitting-Service.git
```

#### Install project dependencies

```sh
npm install
```

#### Run a development server

```sh
npm run dev
```

#### Run test

```sh
npm run test
```
- Test cases can be found [here](https://github.com/Ann-tech/Payment-Splitting-Service/blob/main/tests/splitPayments.test.js)

### Model

#### transaction

| field        | data_type     | constraints               |
| ------------ | ------------- | ------------------------- |
| ID           | number        | required, unique          |
| Amount       | number        | required                  |
| Currency     | number        | required                  |
| SplitInfo    | SplitEntity[] | required, min = 1 max = 20|
| SplitType    | string        | required                  |
| SplitValue   | number        | required                  |
| SplitEntityId| string        | required                  |

Sample request format can be found in the usage section

### Validation, Error handling and Test cases
- The application handles validation efficiently. The request body is validated and appropriate error messages are sent for invalid transaction format. 
- Note that the fields above are case sensitive and should be provided as seen. A same request format can be found below
- Test cases can be found [here](https://github.com/Ann-tech/Payment-Splitting-Service/blob/main/tests/splitPayments.test.js)
- Request body validation was done using jest. Validation schema can be found [here](https://github.com/Ann-tech/Payment-Splitting-Service/blob/main/src/validators/transaction.validator.js)
- Other validators and checks can be found [here](https://github.com/Ann-tech/Payment-Splitting-Service/blob/main/src/validators/validator.js)

- Postman collection can be found [here](https://github.com/Ann-tech/Payment-Splitting-Service/blob/main/Payment%20Splitting%20Service.postman_collection.json)

## Usage

### Base URL

- https://payment-splitting-service.onrender.com

### Split payment transaction

- Route: /split-payments/compute
- Method: POST
- Url: https://payment-splitting-service.onrender.com/split-payments/compute

:point_down: Body

```json
{
   "ID": 13092,
   "Amount": 4500,
   "Currency": "NGN",
   "CustomerEmail": "anon8@customers.io",
   "SplitInfo": [
       {
           "SplitType": "FLAT",
           "SplitValue": 450,
           "SplitEntityId": "SCRACC0019"
       },
       {
           "SplitType": "RATIO",
           "SplitValue": 3,
           "SplitEntityId": "SCRACC0011"
       },
       {
           "SplitType": "PERCENTAGE",
           "SplitValue": 3,
           "SplitEntityId": "SCRACC0015"
       },
       {
           "SplitType": "RATIO",
           "SplitValue": 2,
           "SplitEntityId": "SCRACC0016"
       },
       {
           "SplitType": "FLAT",
           "SplitValue": 2450,
           "SplitEntityId": "SCRACC0029"
       },
       {
           "SplitType": "PERCENTAGE",
           "SplitValue": 10,
           "SplitEntityId": "SCRACC0215"
       }
   ]
}

```

:point_down: Response

```json
{
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
  ],
  "success": true
}
```


<p align="right"><a href="#readme-top">back to top</a></p>

---

### Constraints
- The SplitInfo array can contain a minimum of 1 split entity and a maximum of 20 entities.
- The final Balance value in your response cannot be less than 0.
- The split Amount value computed for each entity cannot be greater than the transaction Amount.
- The split Amount value computed for each entity cannot be less than 0.
- The sum of all split Amount values computed cannot be greater than the transaction Amount

- All the above constraints were satisfied. Appropriate error messages are sent if any of the constraint specified about is violated. 
- Test cases satisfying the above constraints can be found [here](https://github.com/Ann-tech/Payment-Splitting-Service/blob/main/tests/splitPayments.test.js) on the last few test cases.

### NOTE
- SplitAmount for each entity is never approximated during calculation.
- SplitAmount is specified as is on every SplitAmount field.




<!-- Contact -->

## Contact

- Twitter - [@OnyekaAnn1](https://twitter.com/OnyekaAnn1)
- email - Onyekaann17@gmail.com

Project Link: [Payment Splitting Service API](https://github.com/Ann-tech/Payment-Splitting-Service)

<p align="right"><a href="#readme-top">back to top</a></p>

---


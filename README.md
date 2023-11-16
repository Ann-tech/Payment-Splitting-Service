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



<!-- Contact -->

## Contact

- Twitter - [@OnyekaAnn1](https://twitter.com/OnyekaAnn1)
- email - Onyekaann17@gmail.com

Project Link: [Conversational-api](https://github.com/Ann-tech/Payment-Splitting-Service)

<p align="right"><a href="#readme-top">back to top</a></p>

---


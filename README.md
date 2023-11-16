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

## Usage

### Base URL

- 

### Split payment transaction

- Route: /split-payments/compute
- Method: POST

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


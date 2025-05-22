# 📦 Product Autocomplete API

A simple **Node.js + Express** backend that provides **autocomplete search** functionality on a list of products stored in a local JSON file (seeded from DummyJSON API).

---

## 🚀 Features

- 🔍 `/products/search` endpoint with query support, pagination, and relevance scoring  
- 🧠 Search ranking based on:  
  1. Title starts with query → score 3  
  2. Title includes query → score 2  
  3. Brand includes query → score 1  
- 🛠 Uses a local JSON file as a lightweight data store (no external DB)  
- 📄 Written in TypeScript for type safety  
- ✅ Includes Jest test coverage for core functionality  
- 📦 Auto-fetches & seeds 100+ products on first run, skips if data exists  

---

## 🧪 Setup Instructions

```bash
# 1. Clone the repo
git clone https://github.com/Shubh6665/product-autocomplete-backend.git
cd product-autocomplete-backend

# 2. Install dependencies
npm install

# 3. Start the development server
npm start
````

The server will start on: [http://localhost:3000](http://localhost:3000)

> 📝 On first run, the app automatically fetches products from [DummyJSON](https://dummyjson.com/products) and saves them to `data/products.json`.

---

## 🧠 Approach & Thought Process

* Uses data/products.json to simulate a database.
* Matches queries against `title` and `brand` , ranking results by relevance
* Pagination support is built-in using `limit` and `skip` query parameters.
* Input validation ensures only meaningful queries (≥2 characters) are processed.

---

## 🔬 Sample API Usage

**Request:**

```bash
GET /products/search?q=red&limit=5&skip=0
```

**Curl example:**

```bash
curl "http://localhost:3000/products/search?q=red&limit=5&skip=0"
```

**Sample response:**

```json
{
  "count": 5,
  "results": [
    {
      "id": 4,
      "title": "Red Lipstick",
      "brand": "Chic Cosmetics",
      "category": "beauty",
      "price": 12.99,
      "score": 3
    },
    ...
  ]
}
```

---

## ❗ Constraints & Validations

* Query parameter `q` is **required** and must be at least 2 characters long.
* Returns HTTP `400 Bad Request` if validation fails.
* Returns an empty result array if no matches are found.

---

## 🧪 Running Tests

To run the existing Jest tests, simply execute:

```bash
npm test
```

Tests cover:

* Valid search queries
* Case-insensitivity
* Pagination logic (limit and skip)
* Handling of invalid or too-short queries
* No-match scenarios

Run `npm test -- --coverage` for coverage report.

Sample output:

```
--------------------|---------|----------|---------|---------|-------------------
File                | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
--------------------|---------|----------|---------|---------|-------------------
All files           |   95.23 |    78.57 |     100 |     100 |                   
 productServices.ts |   95.23 |    78.57 |     100 |     100 | 8,16,22           
--------------------|---------|----------|---------|---------|-------------------
Test Suites: 1 passed, 1 total
Tests:       5 passed, 5 total
Snapshots:   0 total
Time:        0.708 s, estimated 1 s
```

## 📁 Project Folder Structure

```
product-autocomplete-backend/
│ 
├── src/
│   ├── controllers/
│   │   └── productController.ts
│   ├── data/
│   │   └── products.json 
│   ├── services/
│   │   └── productServices.ts    
│   ├── routes/
│   │   └── productRoutes.ts
│   ├── utils/
│   │   └── fetchandseed.ts                
│   └── index.ts                  
│
├── tests/
│   └── productServices.test.ts  
│
├── package.json
├── tsconfig.json
├── jest.config.js
└── README.md
```

---







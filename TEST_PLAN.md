# 🧪 Money Mastery – Test Plan Document

## 1. Overview

**Project**: Money Mastery  
**Team Members**: Aida L. Ramos, [Other Names]  
**Instructor**: [Instructor Name]  
**Course**: Software Engineering 1  
**Date**: [Submission Date]

**Purpose**:  
This document describes the testing strategy, techniques, and cases used to validate the backend functionality of the Money Mastery budgeting app. It ensures the application meets the software requirements documented in the SRD and SDD.

---

## 2. Scope of Testing

This test plan covers:

- Route accessibility and HTTP behavior
- Reward and budget logic (unit-tested)
- MongoDB persistence and response validation
- Negative scenarios (invalid input, missing file)
- Integration with mock data loading and retrieval

---

## 3. Objectives

| Objective                                    | Method             |
|----------------------------------------------|--------------------|
| Validate mock data routes                    | Integration testing |
| Confirm budget/reward logic correctness      | Unit testing       |
| Catch errors on bad input or missing files   | Negative testing   |
| Ensure data loads into MongoDB successfully  | Manual + integration |

---

## 4. Testing Strategy

| Type              | Tools Used          | Coverage                                 |
|-------------------|---------------------|------------------------------------------|
| Unit Testing       | Jest                | Budget %, reward points                  |
| Integration Testing| curl, Supertest     | `/api/*` routes, data flow               |
| Negative Testing   | curl, Postman       | Missing file, invalid user               |
| Manual Testing     | MongoDB Compass     | Confirm DB insertions and structure      |

---

## 5. Test Environment

| Component   | Setup                       |
|------------|-----------------------------|
| Backend     | Node.js + Express + Mongoose |
| Database    | MongoDB Atlas (URI in `.env`) |
| Testing     | Jest, curl, MongoDB Compass |
| Deployment  | Localhost (`localhost:3000`) |

---

## 6. Test Case Summary

| TC ID | Feature         | Description                             | Type        | Result |
|-------|------------------|-----------------------------------------|-------------|--------|
| TC-01 | `/api/mock/test` | Confirms mock route is live             | Functional  | ✅     |
| TC-02 | `/api/mock/load` | Loads mock transactions into MongoDB    | Integration | ✅     |
| TC-03 | `/api/mock/load` | Returns 404 if file missing             | Negative    | ✅     |
| TC-04 | `/transactions/:userId` | Returns correct transaction data | Functional  | ✅     |
| TC-05 | Budget tracking  | Calculates percent and remaining        | Unit        | ✅     |
| TC-06 | Reward points    | Returns 175 pts for valid input         | Unit        | ✅     |
| TC-07 | Reward edge case | Handles invalid input without crashing  | Negative    | ✅     |

---

## 7. Detailed Test Cases

### ✅ TC-02: Load Valid Mock Data

- **Description**: Ensures `/api/mock/load` loads mockTransactions.json into the database.
- **Steps**:
  - Place mock file in `/mock/mockTransactions.json`
  - Call endpoint with curl
- **Expected**: 
  - 200 status
  - JSON `{ message: '✅ Loaded X transactions into MongoDB.' }`
  - Compass shows data under `money-mastery > transactions`

---

### ❌ TC-03: Handle Missing File

- **Description**: Simulates the mock file being missing.
- **Steps**:
  - Rename or delete `mockTransactions.json`
  - Call `/api/mock/load`
- **Expected**: 
  - 404 status with `{ error: 'Mock transactions file not found.' }`

---

### ✅ TC-05: Budget Logic Calculation

- **Function**: `getSpendingStatus(transactions, category, limit)`
- **Test**: 
  - Spent: 75 / Limit: 100
- **Expected**:
  ```json
  { spent: 75, remaining: 25, percent: 75 }
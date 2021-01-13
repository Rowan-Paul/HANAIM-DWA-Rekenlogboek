## Logbook

removed routes:

- GET /groups/:group/years
- GET /logbook/:id/teacher
- GET /:id

**`POST`** `/logbook`

Create a new logbook.

| Parameters | Send in body                  | Return as JSON |
| ---------- | ----------------------------- | -------------- |
| None       | JSON object with logbook info |                |

---

**`PUT`** `/logbook/:id/currentPhase`

Updates the currentPhase for a logbook.

| Parameters     | Send in body                  | Return as JSON      |
| -------------- | ----------------------------- | ------------------- |
| id - logbookid | JSON object with currentPhase | The updated logbook |

---

**`GET`** `/logbook/groups/:group`

Get the active logbook for a certain group.

| Parameters    | Send in body | Return as JSON      |
| ------------- | ------------ | ------------------- |
| group - group |              | The updated logbook |

---

**`PUT`** `/logbook/:id/activeGoal`

Update a logbook's currentGoal

| Parameters      | Send in body                    | Return as JSON |
| --------------- | ------------------------------- | -------------- |
| id - logbook id | JSON object with the activeGoal |                |

---

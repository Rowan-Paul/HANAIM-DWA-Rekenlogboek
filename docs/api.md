# temp file

removed routes:

- GET /groups/:group/years
- GET /logbook/:id/teacher
- GET /logbook/:id (x3)
- GET /logbook/:id/goals
- GET /logbook/:id/column/:position
- GET /logbook/:id/goal/:position

## Logbook

**`POST`** `/logbook`

Create a new logbook.

| Parameters | Send in body                  | Return as JSON |
| ---------- | ----------------------------- | -------------- |
| None       | JSON object with logbook info |                |

---

**`GET`** `/logbook/:id`

Get all information about one logbook

| Parameters      | Send in body | Return as JSON        |
| --------------- | ------------ | --------------------- |
| id - logbook id |              | The requested logbook |

---

**`PUT`** `/logbook/:id/currentPhase`

Updates the currentPhase for a logbook.

| Parameters      | Send in body                  | Return as JSON      |
| --------------- | ----------------------------- | ------------------- |
| id - logbook id | JSON object with currentPhase | The updated logbook |

---

**`GET`** `/logbook/groups/:group`

Get the active logbook for a certain group.

| Parameters | Send in body | Return as JSON      |
| ---------- | ------------ | ------------------- |
| group      |              | The updated logbook |

---

**`PUT`** `/logbook/:id/activeGoal`

Update a logbook's currentGoal

| Parameters      | Send in body                    | Return as JSON |
| --------------- | ------------------------------- | -------------- |
| id - logbook id | JSON object with the activeGoal |                |

---

**`GET`** `/logbook/years/:year/groups/:group/periods/:period`

Get all information about one logbook with specifications

| Parameters | Send in body | Return as JSON        |     |
| ---------- | ------------ | --------------------- | --- |
| year       |              | The requested logbook |     |
| group      |              |                       |     |
| period     |              |                       |     |

---

**`GET`** `/logbook/years/:year/groups/:group/periods`

Get the amount of periods based on group and year.

| Parameters | Send in body | Return as JSON        |     |
| ---------- | ------------ | --------------------- | --- |
| year       |              | The requested logbook |     |
| group      |              |                       |     |

---

**`GET`** `/logbook/groups/:group/years`

Get all years from a group

| Parameters | Send in body | Return as JSON        |     |
| ---------- | ------------ | --------------------- | --- |
| group      |              | The requested logbook |     |

---

## Studentlogbook

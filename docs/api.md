## Logbook routes

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

| Parameters | Send in body | Return as JSON        |
| ---------- | ------------ | --------------------- |
| year       |              | The requested logbook |
| group      |              |                       |
| period     |              |                       |

---

**`GET`** `/logbook/years/:year/groups/:group/periods`

Get the amount of periods based on group and year.

| Parameters | Send in body | Return as JSON        |
| ---------- | ------------ | --------------------- |
| year       |              | The requested logbook |
| group      |              |                       |

---

**`GET`** `/logbook/groups/:group/years`

Get all years from a group

| Parameters | Send in body | Return as JSON        |
| ---------- | ------------ | --------------------- |
| group      |              | The requested logbook |

---

**`PUT`** `/logbook/groups/:group/currentPhase`

Update all currentPhases to notVisible

| Parameters | Send in body | Return as JSON |
| ---------- | ------------ | -------------- |
| group      |              |                |

---

## Studentlogbook routes

**`POST`** `/studentlogbook`

Create a new studentlogbook

| Parameters | Send in body                     | Return as JSON        |
| ---------- | -------------------------------- | --------------------- |
|            | JSON with logbook id and student | The studentlogbook id |

---

**`PUT`** `/studentlogbook`

Updates a studentlogbook

| Parameters | Send in body                      | Return as JSON        |
| ---------- | --------------------------------- | --------------------- |
|            | JSON with id, answers and student | The studentlogbook id |

---

**`PUT`** `/studentlogbook/:id`

Updates a studentlogbook based on id

Also sends websocket

| Parameters             | Send in body      | Return as JSON     |
| ---------------------- | ----------------- | ------------------ |
| id - studentlogbook id | JSON with answers | The studentlogbook |

---

**`GET`** `/studentlogbook/:id`

Get all information about a specific studentlogbook

| Parameters             | Send in body | Return as JSON     |
| ---------------------- | ------------ | ------------------ |
| id - studentlogbook id |              | The studentlogbook |

---

**`GET`** `/studentlogbook/logbook/:logbookid`

Get all studentlogbooks related to one logbook (not related to studentlogbook)

| Parameters | Send in body | Return as JSON     |
| ---------- | ------------ | ------------------ |
| logbookid  |              | The studentlogbook |

---

**`GET`** `/studentlogbook/:id/group/overview`

Shows an group overview including all answers sorted by row, column

| Parameters             | Send in body | Return as JSON     |
| ---------------------- | ------------ | ------------------ |
| id - studentlogbook id |              | The studentlogbook |

---

**`GET`** `/studentlogbook/:id/group/overview`

Shows an group overview including all answers sorted by row, column

| Parameters | Send in body | Return as JSON          |
| ---------- | ------------ | ----------------------- |
| logbookID  |              | id, student and answers |

---

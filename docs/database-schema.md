# Database schema

Here you can find an overview of the different things inside the database.

## Logbooks

Contains all general logbooks.

```text
+-------------------------------------------------------+
| Logbooks                                              |
+-------------------------------------------------------+
| _id: ObjectID  (auto)                                 |
| period: Number                                        |
| group: Number                                         |
| year: String                                          |
| teacher: String/Number (ligt miss aan Teams)          |
| currentPhase: String                                  |
| activeGoal: Number                                    |
| activeColumn: Number                                  |
| columns: [{                                           |
|            _id_: ObjectID (auto)                      |
|            position: Number                           |
|            title: String                              |
|            explanation: Boolean                       |
|            input: {                                   |
|                       type: String,                   |
|                       options: [String],              |
|                   }                                   |
|          }]                                           |
| goals: [{                                             |
|            _id_: ObjectID (auto)                      |
|            position: Number                           |
|            title: String                              |
|            description: String                        |
|            imagelink: String                          |
|        }]                                             |
+-------------------------------------------------------+
```

## Studentlogbooks

Contains all logbooks for students.

```text
+-------------------------------------------------------+
| Studentlogbooks                                       |
+-------------------------------------------------------+
| _id: ObjectID (auto)                                  |
| logbookID: ObjectID (ref)                             |
| student: String/Number (ligt miss aan Teams)          |
| answers: [{                                           |
|             _id: ObjectID (auto)                      |
|             goalPosition: Number                      |
|             columnPosition: Number                    |
|             answer: {                                 |
|                       inputType: String               |
|                       value: String                   |
|                       boolean: Boolean                |
|                       explanation: String             |
|                     }                                 |
|          }]                                           |
+-------------------------------------------------------+
```

## Templates

Contains templates for logbooks

```text
+-------------------------------------------------------+
| Templates                                             |
+-------------------------------------------------------+
| _id: ObjectID (auto)                                  |
| group: Number                                         |
| columns: [{                                           |
|            _id: ObjectID (auto)                       |
|            position: Number                           |
|            title: String                              |
|            inputType: String                          |
|          }]                                           |
+-------------------------------------------------------+
```

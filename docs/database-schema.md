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
| columns: [{                                           |
|            _id_: ObjectID (auto)                      |
|            position: Number                           |
|            title: String                              |
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

```text
+-------------------------------------------------------+
|columns: [                                             |
|	{                                                   |
|		added: Boolean,                                 |
|		explanation: Boolean,                           |
|		position: Number,                               |
|		title: String,                                  |
|		input: {                                        |
|			type: String,                               |
|			options: Array of [String]                  |
|		}                                               |
|	},                                                  |
|	{                                                   |
|		added: Boolean,                                 |
|		explanation: Boolean,                           |
|		position: Number,                               |
|		title: String,                                  |
|		input: {                                        |
|			type: String,                               |
|			options: Array of [String]                  |
|		}                                               |
|	}                                                   |
|],                                                     |
|goals: [],                                             |
|group: Number,                                         |
|inputTypes: {                                          |
|	checkboxes: String,                                 |
|	radiobuttons: String,                               |
|	textarea: String                                    |
|},                                                     |
|isAvailable: Boolean,                                  |
|isSaved: Boolean,                                      |
|modal: {                                               |
|	title: String,                                      |
|	visible: Boolean                                    |
|},                                                     |
|period: Number,                                        |
|position: Number,                                      |
|teacher: String,                                       |
|year:                                                  |
+-------------------------------------------------------+
```

## Studentlogbooks

Contains all logbooks for students.

<!--
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
|                     }                                 |
|          }]                                           |
+-------------------------------------------------------+
```
-->

```text
+-------------------------------------------------------+
| Studentlogbook                                        |
+-------------------------------------------------------+
|logbookID: null,                                       |
|currentPhase: null,                                    |
|column: {},                                            |
|goalAmount: null,                                      |
|currentGoal: {                                         |
|	position: Number                                    |
|},                                                     |
|answers: {}                                            |
+-------------------------------------------------------+
```

## Main

```text
+-------------------------------------------------------+
| Main                                                  |
+-------------------------------------------------------+
|user: Object of ,                                      |
|context: Object of                                     |
+-------------------------------------------------------+
```

<!--
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
``` -->

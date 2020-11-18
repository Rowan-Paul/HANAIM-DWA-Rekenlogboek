# Database schema
Here you can find an overview of the different things inside the database.

## Logbooks
Contains all logbooks.

```text
+-------------------------------------------------------+
| Logbooks                                              |
+-------------------------------------------------------+
| _id: ObjectID                                         |
| period: Number                                        |
| group: Number                                         |
| year: String                                          |
| teacher: String/Number (ligt miss aan Teams)          |
| isAvailable: Boolean                                  |
| columns: [{                                           |
|            columnID: Number                           |
|            name: String                               |
|            placeholder: String                        |
|          }]                                           |
| goals: [{                                             |
|            goalID: Number                             |
|            goal: String                               |
|            imagelink: String                          |
|        }]                                             |  
+-------------------------------------------------------+
```

```text
+-------------------------------------------------------+
| Studentlogbooks                                       |
+-------------------------------------------------------+
| _id: ObjectID                                         |
| logbookID: ObjectID (ref)                             |
| student: String/Number (ligt miss aan Teams)          |
| answers: [{                                           |
|             goalID: Number (ref)                      |
|             columnID: Number (ref)                    |
|             answer: String                            |
|             instructionNeeded: Boolean                |
|          }]                                           |   
+-------------------------------------------------------+
```

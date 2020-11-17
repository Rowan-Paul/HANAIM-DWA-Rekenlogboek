# Database schema
Here you can find an overview of the different things inside the database.

## Logbooks
Contains all logbooks.

Versie 3

```text
+-------------------------------------------------------+
| Logbooks                                              |
+-------------------------------------------------------+
| _id: Number/String                                    |
| blok: Number                                          |
| groep: Number                                         |
| leerjaar: Number                                      |
| teacher: String/Number (ligt miss aan Teams)          |
| availableForKids: Boolean                             |
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
| _id: Number/String                                    |
| logbookID: Number                                     |
| student: String/Number (ligt miss aan Teams)          |
| answers: [{                                           |
|             goalID: Number (ref)                      |
|             columnID: Number (ref)                    |
|             answer: String                            |
|             instructionNeeded: Boolean                |
|          }]                                           |   
+-------------------------------------------------------+
```

Versie 2

```text
+-------------------------------------------------------+
| Logbooks                                              |
+-------------------------------------------------------+
| _id: Number (autom door Mongo of zelf)                |
| blok: Number                                          |
| groep: Number                                         |
| leerjaar: Number                                      |
| student: String/Number (ligt miss aan Teams)          |
| docent: String/Number (ligt miss aan Teams)           |
| columns: [String]                                     |
| inputs: [{                                            |
|           row: Number                                 |
|           column1: String                             |
|           column1image: String                        |
|           column2: String                             |
|           column3: String                             |
|           column4: String                             |
|           column5: String                             |
|         }]                                            |
| availableForKids: Boolean                             |
+-------------------------------------------------------+
```

Versie 1

```text
+-------------------------------------------------------+
| Logbooks                                              |
+-------------------------------------------------------+
| _id: Number (autom door Mongo of zelf)                |
| blok: Number                                          |
| groep: Number                                         |
| leerjaar: Number                                      |
| student: String/Number (ligt miss aan Teams)          |
| docent: String/Number (ligt miss aan Teams)           |
| columns: [String]                                     |
| column2: String                                       |
| column3: String                                       |
| column4: String                                       |
| column1inputs: [{ row: Number                         |
|                   input: String                       |
|                }]                                     |
| column2inputs: [String]                               |
| column3inputs: [String]                               |
| column4inputs: [String]                               |
| column1images: [{ row: Number                         |
|                   input: String                       |
|                }]                                     |
+-------------------------------------------------------+
```


[
    {
        row: 1,
        leerdoel: "xx",
        instructie: "yyy",
        evaluatie: "bbb"
    },
    {
        row: 2,
        leerdoel: "yy",
        instructie: "yyy",
        evaluatie: "bbb"
    }
]
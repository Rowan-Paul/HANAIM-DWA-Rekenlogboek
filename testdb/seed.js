const mongoose = require('mongoose');
require("./models/logbook")
require("./models/studentlogbook")

const dbName = 'testdbproject';

const db = mongoose.connection;

const Logbook = mongoose.model('Logbook');
const StudentLogbook = mongoose.model('StudentLogbook');

mongoose.connect(`mongodb://localhost:27017/${dbName}`, { useNewUrlParser: true })
    .then(() => {
        return seedLogbook();
    })
    .then(() => {
        return seedStudentLogboek();
    })
    .catch(err => {
        console.log(err);
    })
    .then(() => {
        db.close();
    });


async function seedLogbook() {
    await Logbook.deleteMany();

    await Logbook.insertMany([
        {
            period: 1,
            group: 5,
            year: 2020,
            teacher: "xxx",
            isAvailable: false,
            columns: [
                {
                    _id: 0,
                    name: "Doelen",
                    placeholder: "vul doelen in"
                },
                {
                    _id: 1,
                    name: "Lesofzo",
                    placeholder: "vvul lesresult in"
                },
                {
                    _id: 2,
                    name: "Instructie nodig?",
                    placeholder: "vvul iets in in"
                }, 
                {
                    _id: 3,
                    name: "Evaluatie",
                    placeholder: "Vul evaluatie"
                }
            ],
            goals: [
                {
                    _id: 0,
                    goal: "Leer rekenen",
                    imagelink: "xxxxxxxxxxxxxx"
                },
                {
                    _id: 1,
                    goal: "Leer 1+1",
                    imagelink: "xxxxxxxxxxssaasdasdaxx"
                },
                {
                    _id: 2,
                    goal: "Leer 1*1",
                    imagelink: "aaaaaaa"
                },
            ]
        },
        {
            period: 2,
            group: 6,
            year: 2020,
            teacher: "yyy",
            isAvailable: false,
            columns: [
                {
                    _id: 0,
                    name: "Doelen",
                    placeholder: "vul doelen in"
                },
                {
                    _id: 1,
                    name: "Lesofzo",
                    placeholder: "vvul lesresult in"
                },
                {
                    _id: 2,
                    name: "Instructie nodig?",
                    placeholder: "vvul iets in in"
                }, 
                {
                    _id: 3,
                    name: "Evaluatie",
                    placeholder: "Vul evaluatie"
                }
            ],
            goals: [
                {
                    _id: 0,
                    goal: "Leer rekenen",
                    imagelink: "xxxxxxxxxxxxxx"
                },
                {
                    _id: 1,
                    goal: "Leer 1+1",
                    imagelink: "xxxxxxxxxxssaasdasdaxx"
                },
                {
                    _id: 2,
                    goal: "Leer 1*1",
                    imagelink: "aaaaaaa"
                },
            ]
        },
    ]);
}

async function seedStudentLogboek() {
    await StudentLogbook.deleteMany();

    await StudentLogbook.insertMany([
        {
            logbookID: "5fb51d465eebc57020f13a01",
            student: 5,
            answers: [
                {
                    goalID: 0,
                    columnID: 1,
                    answer: "Antwoorden van rekenen",
                    instructionNeeded: false
                },
                {
                    goalID: 0,
                    columnID: 2,
                    answer: "Ik heb moeite",
                    instructionNeeded: true
                },
                {
                    goalID: 0,
                    columnID: 3,
                    answer: "Blij",
                    instructionNeeded: false
                },
            ],
        },
    ]);
}




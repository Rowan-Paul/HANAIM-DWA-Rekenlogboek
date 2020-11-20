const mongoose = require('mongoose');
require("./models/logbook")
require("./models/studentlogbook")
require("./models/templates")

const dbName = 'testdbproject';

const db = mongoose.connection;

const Logbook = mongoose.model('Logbook');
const StudentLogbook = mongoose.model('StudentLogbook');
const Templates = mongoose.model('Templates');

mongoose.connect(`mongodb://localhost:27017/${dbName}`, { useNewUrlParser: true })
    .then(() => {
        return seedLogbook();
    })
    .then(() => {
        return seedStudentLogboek();
    })
    .then(() => {
        return seedTemplates();
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
            year: "19/20",
            teacher: "xxx",
            isAvailable: false,
            columns: [
                {
                    position: 0,
                    title: "Doelen",
                    inputType: "xx",
                    placeholder: "vul doelen in"
                },
                {
                    position: 1,
                    title: "Lesofzo",
                    inputType: "xx",
                    placeholder: "vvul lesresult in"
                },
                {
                    position: 2,
                    title: "Instructie nodig?",
                    inputType: "xx",
                    placeholder: "vvul iets in in"
                },
                {
                    position: 3,
                    title: "Evaluatie",
                    inputType: "xx",
                    placeholder: "Vul evaluatie"
                }
            ],
            goals: [
                {
                    position: 0,
                    title: "Leer rekenen",
                    description: "test0000",
                    imagelink: "xxxxxxxxxxxxxx"
                },
                {
                    position: 1,
                    title: "Leer 1+1",
                    description: "test1111",
                    imagelink: "xxxxxxxxxxssaasdasdaxx"
                },
                {
                    position: 2,
                    title: "Leer 1*1",
                    description: "test2222",
                    imagelink: "aaaaaaa"
                },
            ]
        },
        {
            period: 2,
            group: 7,
            year: "19/20",
            teacher: "yyyy",
            isAvailable: false,
            columns: [
                {
                    position: 0,
                    title: "Doelen",
                    inputType: "xx",
                    placeholder: "vul doelen in"
                },
                {
                    position: 1,
                    title: "Lesofzo",
                    inputType: "xx",
                    placeholder: "vvul lesresult in"
                },
                {
                    position: 2,
                    title: "Instructie nodig?",
                    inputType: "xx",
                    placeholder: "vvul iets in in"
                },
                {
                    position: 3,
                    title: "Evaluatie",
                    inputType: "xx",
                    placeholder: "Vul evaluatie"
                }
            ],
            goals: [
                {
                    position: 0,
                    title: "Leer rekenen",
                    description: "test0000",
                    imagelink: "xxxxxxxxxxxxxx"
                },
                {
                    position: 1,
                    title: "Leer 1+1",
                    description: "test1111",
                    imagelink: "xxxxxxxxxxssaasdasdaxx"
                },
                {
                    position: 2,
                    title: "Leer 1*1",
                    description: "test2222",
                    imagelink: "aaaaaaa"
                },
            ]
        },
    ]);
}

async function seedStudentLogboek() {
    await StudentLogbook.deleteMany();

    const logbook = await Logbook.find({}).limit(1);
    
    await StudentLogbook.insertMany([
        {
            logbookID: logbook[0]._id,
            student: "janpiet",
            answers: [
                {
                    goalPosition: 0,
                    columnPosition: 3,
                    answer: {
                        inputType: "Evaluatie",
                        value: "Happy",
                        boolean: false

                    }
                },
                {
                    goalPosition: 0,
                    columnPosition: 2,
                    answer: {
                        inputType: "Instruction",
                        value: "I'm bad at this",
                        boolean: true

                    }
                }
            ]
        },
    ]);
}

async function seedTemplates() {
    await Templates.deleteMany();

    await Templates.insertMany([
        {
            name: "groep 5 template",
            group: 5,
            columns: [
                {
                    position: 0,
                    title: "Doelen",
                    inputType: "xx",
                    placeholder: "vul doelen in"
                },
                {
                    position: 1,
                    title: "Lesofzo",
                    inputType: "xx",
                    placeholder: "vvul lesresult in"
                },
                {
                    position: 2,
                    title: "Instructie nodig?",
                    inputType: "xx",
                    placeholder: "vvul iets in in"
                },
                {
                    position: 3,
                    title: "Evaluatie",
                    inputType: "xx",
                    placeholder: "Vul evaluatie"
                }
            ],
        },
        {
            name: "groep 7 18/19 template",
            group: 7,
            columns: [
                {
                    position: 0,
                    title: "Doelen",
                    inputType: "xx",
                    placeholder: "vul doelen in"
                },
                {
                    position: 1,
                    title: "Lesofzo",
                    inputType: "xx",
                    placeholder: "vvul lesresult in"
                },
                {
                    position: 2,
                    title: "Instructie nodig?",
                    inputType: "xx",
                    placeholder: "vvul iets in in"
                },
                {
                    position: 3,
                    title: "Evaluatie",
                    inputType: "xx",
                    placeholder: "Vul evaluatie"
                }
            ],
        },
    ]);
}



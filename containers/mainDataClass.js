class MainDataClass {
    constructor() {
        this.DBPromiseQuery = require('../connectionToDB');
    }


    updateVisit(jsonArray, response) {
        const updQuery = "UPDATE `journal` AS j\n" +
            "JOIN `student` AS stud ON stud.idstudent = j.idstudent\n" +
            "JOIN `studentgroup` AS g ON g.idgroup = stud.idgroup\n" +
            "JOIN `subject` AS sub ON sub.idsubject = j.idsubject\n" +
            "SET j.idvisit = (SELECT idvisit FROM `visit` WHERE visitmark = ?)\n" +
            "WHERE stud.surname = ? AND stud.name = ? AND stud.patronymic = ? \n" +
            "AND g.studentgroup = ? AND sub.subject = ? AND (j.datetime LIKE ?)";

        const queryData = [
            jsonArray.visitmark,
            jsonArray.surname,
            jsonArray.name,
            jsonArray.patronymic,
            jsonArray.group,
            jsonArray.subject,
            jsonArray.date
        ];

        this.DBPromiseQuery(updQuery, queryData)
            .then(result=>console.log(result))
            .catch(err=>console.log(err));

    }
    getSubjects(response){
    response.json([{
        studentgroup: "1ПИб-01-41оп",
        subject: "Реализация мобильных приложений",
        name: "Селяничев О. Л.",
    },
        {
            studentgroup: "1ПИб-01-41оп",
            subject: "Проекитрование БД",
            name: "Селяничев О. Л.",
        },
    ])
    }

    getJournal(response){
        response.json([{
            subject:"Реализация мобильных приложений",
            teacher: "Селяничев О. Л.",
            date:"10-11-2019 10:10:10",
            studentgroup: "1ПИб-01-41оп",
            classtype: ["Лекц.", "Прак.", "Л.Р."],
            theme: "Какая-то тема",
            hours: [2, 0, 0]

        }])
    }
    getАttendance(jsonArray, response) {
        const data = [
            jsonArray.subject,
            jsonArray.studentgroup
        ];
        const query ="SELECT j.datetime, sub.subject, c.typeclass, stud.surname, stud.name, stud.patronymic, v.visitmark FROM `journal` AS j "+
        "JOIN `subject` AS sub ON sub.idsubject = j.idsubject "+
        "JOIN `classtype` AS c ON c.idtypeclass = j.idclasstype "+
        "JOIN `student` AS stud ON stud.idstudent = j.idstudent "+
            "JOIN `studentgroup` AS g ON g.idgroup = g.idgroup "+
        "JOIN `visit` AS v ON v.idvisit = j.idvisit " +
        "WHERE sub.subject = ? AND g.studentgroup = ?";


        this.DBPromiseQuery(query, data)
            .then(result=>{
                //response.json(this.makeAttendanceArray(result));
            })
            .catch(error=>{
                response.json([{
                    time: ["10-11-2019 10:00:00", "11-11-2019 11:00:00", "12-11-2019 12:00:00", "11-22-2019 13:00:00"],
                    subject: "Реализация мобильных приложений",
                    typeclass: "Л.Р",
                    surname: "Вера",
                    name: "Агафонова",
                    patronymic: "Дмитриевна",
                    visit: [true, true, false, false]
                },
                    {
                        time: ["10-11-2019 10:00:00", "11-11-2019 11:00:00", "12-11-2019 12:00:00", "11-22-2019 13:00:00"],
                        subject: "Реализация мобильных приложений",
                        typeclass: "Л.Р",
                        surname: "Даниил",
                        name: "Арсентьев",
                        patronymic: "Игоревич",
                        visit: [true, true, false, false]
                    },
                    {
                        time: ["10-11-2019 10:00:00", "11-11-2019 11:00:00", "12-11-2019 12:00:00", "11-22-2019 13:00:00"],
                        subject: "Реализация мобильных приложений",
                        typeclass: "Л.Р",
                        surname: "Степан",
                        name: "Борисов",
                        patronymic: "Вадимович",
                        visit: [true, true, false, false]
                    },
                    {
                        time: ["10-11-2019 10:00:00", "11-11-2019 11:00:00", "12-11-2019 12:00:00", "11-22-2019 13:00:00"],
                        subject: "Реализация мобильных приложений",
                        typeclass: "Л.Р",
                        surname: "Андрей",
                        name: "Бутурлакин",
                        patronymic: "Александрович",
                        visit: [true, true, false, false]
                    },
                    {
                        time: ["10-11-2019 10:00:00", "11-11-2019 11:00:00", "12-11-2019 12:00:00", "11-22-2019 13:00:00"],
                        subject: "Реализация мобильных приложений",
                        typeclass: "Л.Р",
                        surname: "Олег",
                        name: "Гришаев",
                        patronymic: "Владимирович",
                        visit: [true, true, false, false]
                    },
                    {
                        time: ["10-11-2019 10:00:00", "11-11-2019 11:00:00", "12-11-2019 12:00:00", "11-22-2019 13:00:00"],
                        subject: "Реализация мобильных приложений",
                        typeclass: "Л.Р",
                        surname: "Кирилл",
                        name: "Ермолинский",
                        patronymic: "ВИЧ",
                        visit: [true, true, false, false]
                    },
                    {
                        time: ["10-11-2019 10:00:00", "11-11-2019 11:00:00", "12-11-2019 12:00:00", "11-22-2019 13:00:00"],
                        subject: "Реализация мобильных приложений",
                        typeclass: "Л.Р",
                        surname: "Максим",
                        name: "Ефимович",
                        patronymic: "вич",
                        visit: [true, true, false, false]
                    },
                    {
                        time: ["10-11-2019 10:00:00", "11-11-2019 11:00:00", "12-11-2019 12:00:00", "11-22-2019 13:00:00"],
                        subject: "Реализация мобильных приложений",
                        typeclass: "Л.Р",
                        surname: "Артем",
                        name: "Кулагин",
                        patronymic: "Викторович",
                        visit: [true, true, false, false]
                    },
                    {
                        time: ["10-11-2019 10:00:00", "11-11-2019 11:00:00", "12-11-2019 12:00:00", "11-22-2019 13:00:00"],
                        subject: "Реализация мобильных приложений",
                        typeclass: "Л.Р",
                        surname: "Никита",
                        name: "Махалов",
                        patronymic: "Олегович",
                        visit: [true, true, false, false]
                    },
                    {
                        time: ["10-11-2019 10:00:00", "11-11-2019 11:00:00", "12-11-2019 12:00:00", "11-22-2019 13:00:00"],
                        subject: "Реализация мобильных приложений",
                        typeclass: "Л.Р",
                        surname: "Михаил",
                        name: "Новиков",
                        patronymic: "Вич",
                        visit: [true, true, false, false]
                    },
                    {
                        time: ["10-11-2019 10:00:00", "11-11-2019 11:00:00", "12-11-2019 12:00:00", "11-22-2019 13:00:00"],
                        subject: "Реализация мобильных приложений",
                        typeclass: "Л.Р",
                        surname: "Сергей",
                        name: "Сидоров",
                        patronymic: "Алексеевич",
                        visit: [true, true, false, false]
                    },
                    {
                        time: ["10-11-2019 10:00:00", "11-11-2019 11:00:00", "12-11-2019 12:00:00", "11-22-2019 13:00:00"],
                        subject: "Реализация мобильных приложений",
                        typeclass: "Л.Р",
                        surname: "Даниил",
                        name: "Соколов",
                        patronymic: "Михайлович",
                        visit: [true, true, false, false]
                    },
                    {
                        time: ["10-11-2019 10:00:00", "11-11-2019 11:00:00", "12-11-2019 12:00:00", "11-22-2019 13:00:00"],
                        subject: "Реализация мобильных приложений",
                        typeclass: "Л.Р",
                        surname: "Макс",
                        name: "Трап",
                        patronymic: "Сергеевич",
                        visit: [true, true, false, false]
                    },
                    {
                        time: ["10-11-2019 10:00:00", "11-11-2019 11:00:00", "12-11-2019 12:00:00", "11-22-2019 13:00:00"],
                        subject: "Реализация мобильных приложений",
                        typeclass: "Л.Р",
                        surname: "Лидия",
                        name: "Чижова",
                        patronymic: "Алексеевна",
                        visit: [true, true, false, false]
                    },

                ]);
                console.log(error)})
    }



    makeAttendanceArray(array){

        const responseArray = [];
        let indexItem = 0;
        array.forEach(item=> {
            if (responseArray.find((item1, index)=>{
                if(item1.surname === item.surname && item1.name ===item.name && item1.patronymic === item.patronymic){
                indexItem = index;
                return true;
            }
                else return false;
            })){
                console.log(responseArray);
                const tmp = responseArray[indexItem];
                console.log(tmp);
                tmp[datetime] = Array.of(tmp[datetime], item[datetime]);
                tmp[visitmark] = Array.of(tmp[visitmark], item[datetime]);
                responseArray[indexItem] = tmp;
            }
            else  responseArray.push(item);
        });
        return responseArray;
    }

    compareWithExisting(collection, record){
        for(let prop in collection){
            if(collection.hasOwnProperty(prop)){
                if(collection[prop]===record){
                    return prop;
                }
            }
        }
    }

    addNewDataToIdTable(data){
        const query = `INSERT INTO ${data.table} ${data.field} VALUES (?)`;
        this.DBPromiseQuery(query,  data.record)
            .then(result=>result)
            .catch(error=>console.log(error))
    }


}

var mainDataClass = new MainDataClass();
module.exports = mainDataClass;

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
                response.json(this.makeAttendanceArray(result));
            })
            .catch(error=>console.log(error))
    }

    getSubject(response){

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

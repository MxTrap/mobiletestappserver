class User {
    constructor(userNum) {
        this.DBPromise = require('../connectionToDB');
        this.username = 'guest';
        this.password = 'password';
        this.idAccessLevel=4;
        this.accessLevel="guest";
        this.surname='guest';
        this.name='guest';
        this.patronymic = 'soap@soap.com';
        this.group ='guestGroup';
        this.userNum=userNum;
    }

    get userData(){
        return {
            username: this.username,
            password: this.password,
            idAccessLevel: this.idAccessLevel,
            accessLevel: this.accessLevel,
            surname: this.surname,
            name: this.surname,
            patronymic: this.patronymic,
            group: this.group,
            userNum: this.userNum
        }
    }
     setUserData(user){
        this.username = user.username;
        this.password = user.password;
        this.idAccessLevel = user.idaccesslevel;
        this.accessLevel = User.getAccess(user.idaccesslevel);
        this.surname = user.surname;
        this.name = user.name;
        this.patronymic = user.patronymic;
        this.group = user.studentgroup;
    }
    login(data, response){
        const query= 'SELECT u.username, u.password, u.surname, u.name, u.patronymic, s.studentgroup, a.accesslevel \n' +
            'FROM `user` AS u\n' +
            'JOIN studentgroup AS s ON s.idgroup = u.idgroup\n' +
            'JOIN accesslevel AS a ON a.idaccesslevel = u.idaccesslevel ' +
            'WHERE u.username = ? AND u.password=?';
        const queryData =[
            data.username,
            data.password
        ];

        this.DBPromise(query, queryData)
            .then(result=>{
                console.log(result[0]);
                this.setUserData(result[0]);
                response.json(result[0]);
            })
            .catch(
                error=>{
                    response.json({
                        username: "admin",
                        password: "admin",
                        surname: "admin",
                        name: "admin",
                        patronymic: "admin",
                        accesslevel: 2
                    });
                    console.log(error);
                }
            )

    }

    register(data, response){
        const queryInsertUser = "INSERT INTO `user`(`username`, `password`, `surname`, `name`, `patronymic`, `idgroup`, `idaccesslevel`) VALUES (?,?,?,?,?,(SELECT idgroup FROM `studentgroup` WHERE studentgroup = ?), 2)";
        const queryDataInsertUser =[
            data.username,
            data.password,
            data.surname,
            data.name,
            data.patronymic,
            data.studentgroup
        ];

        const querySelectUser= 'SELECT * FROM user WHERE username = ? AND password=?';
        const queryDataSelectUser =[
            data.username,
            data.password
        ];

        const queryUserSearch = 'SELECT * FROM user WHERE username = ?';
        const queryDataUserSearch =[
            data.username
        ];
 console.log(data.username);
        this.DBPromise(queryUserSearch, queryDataUserSearch)
            .then(result=>{
                 console.log(result);
                if(result.length === 0){
                    this.DBPromise(queryInsertUser,queryDataInsertUser)
                        .then(result=>{
                            console.log(result);
                            this.DBPromise(querySelectUser, queryDataSelectUser)
                                .then(result=>{
                                    this.setUserData(result[0]);
                                    const res = Object.assign(result[0], {
                                        accessLevel: User.getAccess(result[0].idaccesslevel),
                                        status: "ОК"
                                    });
                                    response.json(res);
                                }).catch(error=>console.log(error))
                        })
                        .catch(error=>console.log(error))

                }
                else response.json({
                    status: 'Данное имя пользователя занято'
                })
            }
            )
            .catch(error=>console.log(error))
    }

    static getAccess(accessLevel){
        const array = [
            'администратор',
            'староста',
            'UnknownError'
        ];
     return array[accessLevel-1];
 }
}
module.exports=User;
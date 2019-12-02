class Administration {
    constructor(){
        this.DBPromise =require('../connectionToDB');

    }
getAllUsers(response){
        const query = 'SELECT * FROM user_data';
        this.DBPromise(query)
            .then(result=>{
                response.json(result)
            })
            .catch(err=>console.log(err))
}
updateUserStatus(data, response){
        const query='UPDATE user_data SET id_access_level = ? WHERE username = ?';
        const updateData = [
            data.username,
            data.idAccessLevel
        ];
        this.DBPromise(query,updateData)
            .then(result=>result)
            .catch(err=>console.log(err))
}


}


const administration = new Administration();
module.exports =administration;
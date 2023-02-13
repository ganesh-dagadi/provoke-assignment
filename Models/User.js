class User{
 constructor(username , password){
   //Simple validation performed. More intense validation in production
    if(typeof username != "string" || typeof password != "string") throw new Error("Data validation failed")
    this.username = username
    this.password = password
 }
}

module.exports = User
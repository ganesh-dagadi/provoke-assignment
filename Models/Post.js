class Post{
    constructor(title , description){
        //Simple validation performed. More intense validation in production
        if(typeof title != "string" || typeof description != "string") throw new Error("Data validation failed on Posts")
        this.title = title;
        this.description = description
    }
}

module.exports = Post
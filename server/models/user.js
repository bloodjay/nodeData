const {mongoose} = require('../db/mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        minlength:1,
        trim:true,
        minlength:1,
        unique:true,
        validate:{
            validator:validator.isEmail,
            message:'{value} is not a valid email'
        }
    },
    password:{
        type:String,
        require:true,
        minlength:6
    },
    tokens:[{
        access:{
            type:String,
            require:true
        },
        token:{
            type:String,
            require:true
        }
    }]
});

UserSchema.methods.toJSON = function() {
    console.log(this);
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject,['_id','email']);
}

UserSchema.methods.generateAuthToken= function(){
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id:user._id.toHexString(),access},'abc').toString();
    console.log(token);
    user.tokens=user.tokens.concat([{
        access,token
    }]);
    console.log(user);
    return user.save().then(()=>{
        return token;
    })
}

UserSchema.statics.findByToken = function(token){
   var User = this;
   var decoded;

   try{
      decoded = jwt.verify(token,'abc');
   }catch(e){
       return Promise.reject();
   }

   return User.findOne({
      '_id':decoded._id,
      'tokens.token':token,
      'tokens.access':'auth'
   });
};

var User = mongoose.model('User',UserSchema);

module.exports = {User}
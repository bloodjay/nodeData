var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
console.log(process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI);

module.exports = {
    mongoose:mongoose
};
//process.env.NODE_ENV === 'production'
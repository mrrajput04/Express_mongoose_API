const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    PORT:process.env.PORT,
    DBURL:process.env.DBURL,
    secretKey:process.env.secretKey
}
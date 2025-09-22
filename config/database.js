const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = () => {
    mongoose
        .connect(process.env.DATABASE_URL)
        .then(() => console.log('DB Connected successfull'))
        .catch((error) => {
            console.log(error);
            console.error(error.message);
            process.exit(1);
        });
};
module.exports = dbConnect;

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

module.exports = {
    PORT: process.env.PORT,
    ATLAS_URI: process.env.ATLAS_URI,
    JWT_SECRET: process.env.JWT_SECRET
};

//  JWT consists of three parts: a header, payload, and signature.
//JWTs are a good way of securely transmitting information between parties because they can be signed

const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET,
    {
        expiresIn: "30d",
    });
};

module.exports = generateToken;
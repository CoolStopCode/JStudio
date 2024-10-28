const crypto = require('crypto');

const users = {}; // In-memory storage for users

function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

function createUser(username, password) {
    if (users[username]) {
        console.log(`User creation failed: User ${username} already exists.`);
        return { success: false, message: 'User already exists' };
    }
    users[username] = { password: hashPassword(password) };
    console.log(`User ${username} created successfully.`);
    return { success: true };
}

function authenticateUser(username, password) {
    const user = users[username];
    if (user && user.password === hashPassword(password)) {
        console.log(`User ${username} authenticated successfully.`);
        return { success: true };
    }
    console.log(`Authentication failed for user ${username}.`);
    return { success: false, message: 'Invalid username or password' };
}

module.exports = { createUser, authenticateUser };

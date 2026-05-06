// database/associations.js
const User  = require('../modules/user/userModel');
const Video = require('../modules/video/videoModel');

User.hasMany(Video,   { foreignKey: 'userId' });
Video.belongsTo(User, { foreignKey: 'userId' });
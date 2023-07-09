const cors = require('cors');
var whitelist = process.env.ALLOWED_ORIGIN || 'http://localhost:3000';

const corsSetting = cors({
  credentials: true,
  origin: function (origin: string, callback: Function) {
    const originUrl = origin || whitelist;
    if (whitelist.indexOf(originUrl) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
});

export default corsSetting;

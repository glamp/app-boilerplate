const _ = require('lodash');
const enforce = require('express-sslify');

exports.helpers = (req, res, next) => {
  res.redirectHome = () => {
    res.redirect('/');
  }

  res.replyOK = (data) => {
    if (_.isNil(data)) {
      res.json({ status: "OK" });
      return;
    }
    res.json({
      status: "OK",
      ...data
    });
  }

  res.replyError = (code, err) => {
    res.status(code);
    res.json({
      status: "ERROR",
      message: err.toString()
    });
  }

  return next();
}

exports.forceHTTPS = (req, res, next) => {
  if (process.env.NODE_ENV==='production') {
    return enforce.HTTPS({ trustProtoHeader: true })(req, res, next);
  } else {
    return next();
  }
}

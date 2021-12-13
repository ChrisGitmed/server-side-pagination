const uuid = require('uuid');

class Err extends Error {
  constructor({ message, code = 500, context = '' }) {
    super(message);

    // Map the error properties onto this object
    Object.assign(this, { err_message: message, code, uuid: uuid.v4() });

    // Capture stack trace and remove all frames above constructorOpt from results
    Error.captureStackTrace(this, Err);
  };
};

const errHandler = (err, next, context = 'No context provided') => {
  if (err instanceof Err) {
    return next(err);
  };
  return next(new Err({ message: err, code: 500, context }));
};

module.exports = { Err, errHandler };

const router = require('../../router/router');
const { Users } = require('./');
const { errHandler } = require('../../lib/error');
const { asCallBack } = require('../../util/helpers');


/// Get All
router.get('/v1/users', async (req, res, next) => {
    const [err, users] = await asCallBack(Users.get());
    if (err) return errHandler(err, next, `Users.get`);

    res.status(201).json(users);
});


/// Paginate (via limit and offset) 🎉
router.get('/v1/pagination/users', async (req, res, next) => {
  let { page, limit } = req.query;

  if (!page) page = 1
  if (!limit) limit = 50;
  limit = parseInt(limit);

  const skip = (page - 1) * limit;

  // Get Users
  const [errUsers, users] = await asCallBack(Users.getAllPaginated(skip, limit))
  if (errUsers) return errHandler(errUsers, next, `Users.getAllPaginated: ${skip}, ${limit}`);

  // Get Last Page Number
  const [errLast, last_page_number] = await asCallBack(Users.getLastPageNumber(limit));
  if (errLast) return errHandler(errLast, next, `Users.getLastPageNumber: ${limit}`);

  const resultPayload = {
    data: users,
    current_page_number: parseInt(page),
    last_page_number,
    limit
  };
  res.status(200).json(resultPayload);
});
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
  let { page, size } = req.query;

  if (!page) page = 1
  if (!size) size = 50;

  const limit = parseInt(size);
  const skip = (page - 1) * size;

  const [err, users] = await asCallBack(Users.getAllPaginated(skip, limit))
  if (err) return errHandler(err, next, `Users.getAllPaginate: ${skip}, ${limit}`);

  res.status(200).json(users);
});
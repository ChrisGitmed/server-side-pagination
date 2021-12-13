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


// Send back { data: [], current_page, last_page }
/// Paginate (via limit and offset) 🎉
router.get('/v1/pagination/users', async (req, res, next) => {
  let { page, limit } = req.query;

  if (!page) page = 1
  if (!limit) limit = 50;

  limit = parseInt(limit);
  const skip = (page - 1) * limit;

  const [err, results] = await asCallBack(Users.getAllPaginated(skip, limit))
  if (err) return errHandler(err, next, `Users.getAllPaginate: ${skip}, ${limit}`);

  const [errLast, last_page_results] = await asCallBack(Users.getLastPageNumber(limit));
  if (errLast) return errHandler(errLast, next, `Users.getLastPageNumber: ${limit}`);
  console.log('last_page_results: ',last_page_results)


  res.status(200).json({ data: results, current_page: parseInt(page), last_page: last_page_results });
});
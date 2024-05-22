import jwt from 'jsonwebtoken'

async function role(req, res, next) {
  try {
    const token = req.header("x-auth-token");
    const data = jwt.verify(token, process.env.JWT_SECRET_TOKEN_KEY);
    console.log(data);
    if (data.role !== 1)
      throw new res.error(403, "forbidden");
    next();
  } catch (error) {
    if (!error.statusCode) error = new res.error(401, "Unauthorized!");
    next(error);
  }
}

export default role;

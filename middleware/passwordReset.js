

const passwordCheck = async (req, res, next) => {
    const errors = [];

    if (req.body.password !== req.body.confirm_password) {
        const error = {
          field: "password",
          message: "password doesn't match",
        };
        errors.push(error);
      }
      if (errors.length > 0)
        return res.status(500).json({ Error: "Please check below fields", errors });
        next();

    }


    module.exports = passwordCheck
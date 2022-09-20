const argon2 = require("argon2");

const jwt = require("jsonwebtoken");
const {mailRecover} = require("./sendEmail")

const hashingOptions = {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 5,
    parallelism: 1,
  };

const verifyPassword = (req, res) => {
argon2
    .verify(req.user.hashedPassword, req.body.password)
    .then((isVerified) => {
    if (isVerified) {
        const payload = { sub: req.user.id,user:req.user.firstname };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
        });

        delete req.user.hashedPassword;
        res.send({ token, user: req.user });
    } else {
        res.sendStatus(401);
    }
    })
    .catch((err) => {
    console.error(err);
    res.sendStatus(500);
    });
};

const modifyPassword = (req, res) => {
  console.log(req.user)
            const payload = { sub: req.user.id,reset:"reset"};
    
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "15m",
            });
            message = ({id:req.user.id,token: token})
            mailRecover(message)
            // delete req.user.hashedPassword;
            res.send({ token, user: req.user });
    };

const verifyToken = (req, res, next) => {
try {
    const authorizationHeader = req.get("Authorization");
    console.log(authorizationHeader);
    if (authorizationHeader == null) {
    throw new Error("Authorization header is missing");
    }

    const [type, token] = authorizationHeader.split(" ");

    if (type !== "Bearer") {
    throw new Error("Authorization header has not the 'Bearer' type");
    }

    req.payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log(req.payload.sub)

    next();
} catch (err) {
    console.error(err);
    res.sendStatus(401);
}
};

const hashPassword = (req, res, next) => {
  argon2
    .hash(req.body.password, hashingOptions)
    .then((hashedPassword) => {
      console.log(hashedPassword);

      req.body.hashedPassword = hashedPassword;
      delete req.body.password;

      next();
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};


const hashPasswordForReset = (req, res, next) => {
  // Récupère l'id via un parametre d'url
  const id = parseInt(req.params.id)
  // Recupère le token envoyer en auth
  const token = req.headers.authorization.split(" ")[1];
  console.log("auto : " + req.headers.authorization.split(" ")[1])
  // Décode le token
  req.payload = jwt.verify(token, process.env.JWT_SECRET);
  // Verification que l'id en parametre correspond bien a l'id du token
  if (id === req.payload.sub && req.payload.reset === "reset"){
  argon2
    .hash(req.body.password, hashingOptions)
    .then((hashedPassword) => {
      req.body.hashedPassword = hashedPassword;
      delete req.body.password;
      next();
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
  }else{
    res.status(401).send("Not Good User for modify password")
  }
};

module.exports = {
  hashPassword,
  verifyPassword,
  verifyToken,
  modifyPassword,
  hashPasswordForReset
};

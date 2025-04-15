import type { RequestHandler } from "express";
import Auth from "../../services/Auth/Auth";
import userRepository from "./userRepository";

// Import access to data

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all users
    const user = await userRepository.readAll();

    // Respond with the users in JSON format
    res.json(user);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific user based on the provided ID
    const userId = Number(req.params.id);
    const user = await userRepository.read(userId);

    // If the user is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the user in JSON format
    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    const new_user = {
      lastname: req.body.lastname,
      firstname: req.body.firstname,
      email: req.body.email,
      password: req.body.password,
    };

    // Create the user
    const insertId = await userRepository.create(new_user);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted user
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
const edit: RequestHandler = async (req, res, next) => {
  try {
    const update_user = {
      id: req.body.id,
      lastname: req.body.lastname,
      firstname: req.body.firstname,
      email: req.body.email,
      password: req.body.password,
    };

    const updateUser = await userRepository.update(update_user);

    if (!updateUser) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

const authenticateUser: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await userRepository.getAuth({ email });

    if (!user) {
      res.status(401).json({ message: "Email incorrect." });
    }

    const isPasswordMatch = await Auth.matchPassword(password, user?.password);

    if (!isPasswordMatch) {
      res.status(401).json({ message: "Mot de passe incorrect." });
    }

    const token = Auth.generateToken({
      id: user?.id,
      lastname: user?.lastname,
      firstname: user?.firstname,
      email: user?.email,
      isAdmin: user?.isAdmin,
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
      sameSite: "lax",
      path: "/",
    });

    res.status(200).json({
      message: "Connexion réussie",
      id: user?.id,
      lastname: user?.lastname,
      firstname: user?.firstname,
      email: user?.email,
      isAdmin: user?.isAdmin,
      token,
    });
  } catch (error) {
    next(error);
  }
};

const logout: RequestHandler = async (req, res, next) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  res.status(200).json({ message: "Déconnexion réussie" });
};

export default { browse, read, add, edit, authenticateUser, logout };

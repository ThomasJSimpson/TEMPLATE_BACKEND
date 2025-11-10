const express = require("express");
const router = express.Router();
const Thing = require("../models/thing");

router.post("/", (req, res, next) => {
  // à cause du front end qui envoi deja un id
  delete req.body._id;
  const thing = new Thing({
    ...req.body,
  });
  thing
    .save()
    .then(() => res.status(201).json({ messsage: "Objet enregistré ! " }))
    .catch((error) => res.status(400).json({ error }));
});

router.put("/:id", (req, res, next) => {
  Thing.updateOne({ _id: req.params.id }, { ...req.body, /* etre certains d'avoir le bon id pas celui du front de l'exo */ _id: req.body.id })
    .then(() => res.status(200).json({ messsage: "Objet modifié ! " }))
    .catch((error) => res.status(404).json({ error }));
});

router.delete("/:id", (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id })
    .then((thing) => res.status(200).json({ message: "Objet supprimé !" }))
    .catch((error) => res.status(404).json({ error }));
});

router.get("/:id", (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then((thing) => res.status(200).json(thing))
    .catch((error) => res.status(404).json({ error }));
});

router.get("/", (req, res, next) => {
  Thing.find()
    .then((things) => res.status(200).json(things))
    .catch((error) => res.status(400).json({ error }));
});

module.exports = router;

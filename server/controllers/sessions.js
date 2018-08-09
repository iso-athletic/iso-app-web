const Session = require('../models').Session;

module.exports = {
  create(req, res) {
    return Session
      .create({
        start_time: req.body.start_time,
      })
      .then(todo => res.status(201).send(todo))
      .catch(error => res.status(400).send(error));
  },
  getAll(req, res) {
    return Session
      .all()
      .then(sessions => res.status(200).send(sessions))
      .catch(error => res.status(400).send(error));
  },
};
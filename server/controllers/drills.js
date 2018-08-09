const Drill = require('../models').Drill;

module.exports = {
  create(req, res) {
    return Drill
      .create({
        type: req.body.type,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        session_id: req.params.session_id,
      })
      .then(drill => res.status(201).send(drill))
      .catch(error => res.status(400).send(error));
  },
};
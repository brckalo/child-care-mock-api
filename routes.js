const router = require('express').Router();

const services = require('./services');

services.initData();

router.get('/', (req, res, next) => {
  try {
    res.send('Hello from child care mock api!');
  } catch (error) {
    next(error);
  }
});

// Parent
router.get('/parents', (req, res, next) => {
  try {
    res.json(services.readParents());
  } catch (error) {
    next(error);
  }
});

router.get('/parents/:id', (req, res, next) => {
  try {
    res.json(services.readParentById(req.params.id));
  } catch (error) {
    next(error);
  }
});

router.post('/parents', (req, res, next) => {
  try {
    res.json(services.createParent(req.body));
  } catch (error) {
    next(error);
  }
});

router.put('/parents', (req, res, next) => {
  try {
    res.json(services.updateParent(req.body));
  } catch (error) {
    next(error);
  }
});

router.delete('/parents/:id', (req, res, next) => {
  try {
    res.json(services.deleteParent(req.params.id));
  } catch (error) {
    next(error);
  }
});

// Babysitter
router.get('/babysitters', (req, res, next) => {
  try {
    res.json(services.readBabysitters(req.query.isAvailable));
  } catch (error) {
    next(error);
  }
});

router.get('/babysitters/:id', (req, res, next) => {
  try {
    res.json(services.readBabysitterById(req.params.id));
  } catch (error) {
    next(error);
  }
});

router.post('/babysitters', (req, res, next) => {
  try {
    res.json(services.createBabysitter(req.body));
  } catch (error) {
    next(error);
  }
});

router.put('/babysitters', (req, res, next) => {
  try {
    res.json(services.updateBabysitter(req.body));
  } catch (error) {
    next(error);
  }
});

router.delete('/babysitters/:id', (req, res, next) => {
  try {
    res.json(services.deleteBabysitter(req.params.id));
  } catch (error) {
    next(error);
  }
});

// Child
router.get('/children', (req, res, next) => {
  try {
    res.json(services.readChildren());
  } catch (error) {
    next(error);
  }
});

router.get('/children/:id', (req, res, next) => {
  try {
    res.json(services.readChildById(req.params.id));
  } catch (error) {
    next(error);
  }
});

router.post('/children', (req, res, next) => {
  try {
    res.json(services.createChild(req.body));
  } catch (error) {
    next(error);
  }
});

router.put('/children', (req, res, next) => {
  try {
    res.json(services.updateChild(req.body));
  } catch (error) {
    next(error);
  }
});

router.delete('/children/:id', (req, res, next) => {
  try {
    res.json(services.deleteChild(req.params.id));
  } catch (error) {
    next(error);
  }
});

module.exports = router;

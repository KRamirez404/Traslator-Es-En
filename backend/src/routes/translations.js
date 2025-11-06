const express = require('express');
const router = express.Router();
const translationController = require('../controllers/translationController');

// CRUD operations
router.get('/translations', translationController.getAllTranslations);
router.get('/translations/:id', translationController.getTranslationById);
router.post('/translations', translationController.createTranslation);
router.put('/translations/:id', translationController.updateTranslation);
router.delete('/translations/:id', translationController.deleteTranslation);

// Translation operations
router.get('/translate/es-en/:word', translationController.translateSpanishToEnglish);
router.get('/translate/en-es/:word', translationController.translateEnglishToSpanish);

module.exports = router;

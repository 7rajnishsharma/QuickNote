import express, { RequestHandler } from 'express';
import { createNote, getNotes, updateNote, deleteNote , getNoteById} from '../controllers/noteController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// Explicitly type middleware and handlers as RequestHandler for Express v5 compatibility
router.use(authMiddleware as RequestHandler);

router.post('/', createNote as RequestHandler);
router.get('/', getNotes as RequestHandler);
router.get('/:id', getNoteById as RequestHandler);
router.put('/', updateNote as RequestHandler);
router.delete('/', deleteNote as RequestHandler);

export default router;

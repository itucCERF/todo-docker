import { Router } from 'express';
var router = Router();
router.get('/', (request, response) => {
    response.send({
        message: 'Node.js and Express REST API'}
    );
});
export default router;
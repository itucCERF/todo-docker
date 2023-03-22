import { Router } from 'express';
var router = Router();

const users = [{
    id: 1,
    name: "Richard Hendricks",
    email: "richard@piedpiper.com",
},
{
    id: 2,
    name: "Bertram Gilfoyle",
    email: "gilfoyle@piedpiper.com",
},
];

router.get('/', (request, response) => {
    response.send({
        message: 'Node.js and Express REST API'}
    );
});
router.get('/users', (request, response) => {
    response.send(users);
});

export default router;
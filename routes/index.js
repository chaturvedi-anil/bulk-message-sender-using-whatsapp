import { Router } from "express";
import { waController } from "../controllers/whatsappController.js";
const router = Router();

router.get('/', (req, res)=>
{
    return res.render('index');
});

router.post('/send-message', waController);

export default router;

import { Router } from 'express';
import { celebrate } from 'celebrate';
import { AsyncWrapper } from '@/utils';
import { AddUser , UpdateUser , GetAllUser , Delete} from '../controllers/user';
import { AddNewUser, UserInput } from '@/validators';
import { verifyMongooseId, verifyEmailOnly } from '@/validators/common';
const router = Router();

router.post('/create', celebrate(AddNewUser), AsyncWrapper(AddUser));
router.get('/getAll', AsyncWrapper(GetAllUser));
router.put('/update/:email',  celebrate(verifyEmailOnly),celebrate(AddNewUser),AsyncWrapper(UpdateUser));
router.delete('/delete/:email', celebrate(verifyEmailOnly), AsyncWrapper(Delete));

export default router  
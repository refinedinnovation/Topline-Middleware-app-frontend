import { Router } from 'express';
import { celebrate } from 'celebrate';
import { AsyncWrapper } from '@/utils';
import { Delete } from '../controllers/user';
import { verifyMongooseId } from '@/validators/common';
import { getAllVendor } from '../controllers/vendor/getAllVendor';
import { AddVendor } from '../controllers/vendor/addVendor';
import { UpdateUser } from '../controllers/vendor/updateVendor';
import { verifyEmailOnly } from '@/validators/common';
// import { DisableUser } from '../controllers/vendor/disableVendor';
const router = Router();

router.post('/create', AsyncWrapper(AddVendor));
router.get('/getAll', AsyncWrapper(getAllVendor));
router.put('/update/:id', celebrate(verifyMongooseId), AsyncWrapper(UpdateUser));
router.delete('/delete/:id', celebrate(verifyMongooseId), AsyncWrapper(Delete));
// router.put('/disable/:id', celebrate(verifyMongooseId), AsyncWrapper(DisableUser))

export default router 
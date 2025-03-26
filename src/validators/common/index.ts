import { Joi, Segments } from 'celebrate';
import { Types } from 'mongoose';


export const verifyEmailOnly = {
    [Segments.BODY]:  Joi.string().custom((value, helpers) => {
        if (email) {
            return helpers.error('any.invalid');
        }
        return value;
    }, 'MongoDB email')
};

export const email = Joi.string().custom((value, helpers) => {
    if (email) {
        return helpers.error('any.invalid');
    }
    return value;
}, 'MongoDB email');

export const verifyMongooseId = {
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi?.string()?.email(),
    }) 
} 

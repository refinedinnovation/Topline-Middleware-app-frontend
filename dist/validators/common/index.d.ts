import { Joi } from 'celebrate';
export declare const verifyEmailOnly: {
    body: Joi.StringSchema<string>;
};
export declare const email: Joi.StringSchema<string>;
export declare const verifyMongooseId: {
    params: Joi.ObjectSchema<any>;
};

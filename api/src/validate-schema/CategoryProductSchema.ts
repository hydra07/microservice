import { checkSchema } from 'express-validator';

const CategoryProductSchema = checkSchema( {   
    name: {
        in: ['body'],
        isString: true,
        isLength: {
        errorMessage: 'Name should be at least 3 chars long',
        options: { min: 3 },
        },
    },
    isActive: {
        in: ['body'],
        isBoolean: true,
        optional: true, // Add this line

    },
    id: {
        in: ['params'],
        isInt: true,
        errorMessage: 'Invalid id',
        optional: true, // Add this line

    },
    keyword: {
        in: ['query'],
        isString: true,
        optional: true,
    },
    page: {
        in: ['query'],
        isInt: true,
        toInt: true,
        optional: true,
    },
    limit: {
        in: ['query'],
        isInt: true,
        toInt: true,
        optional: true,
    },
 });
 


 
 export { CategoryProductSchema};
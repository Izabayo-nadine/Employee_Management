const Joi=require('joi')

const employeeSchema=Joi.object(
    {
        firstname: Joi.string().required().max(10),
        lastname:Joi.string().required().max(10),
        national_id: Joi.string().pattern(/^[0-9]{16}$/),
        phone: Joi.string().pattern(/^[0-9]{10,15}$/),
        email: Joi.string().email().required(),
        department: Joi.string().required(),
        position: Joi.string().required(),
        manufacturer: Joi.string().required(),
        model:Joi.string().required(),
        serial_number: Joi.string().required(),
        // birthDate: Joi.date()
        //                .iso() // enforces YYYY-MM-DD format
        //                .max('01-01-2008')  // ≈ 18 years old if today is 2026
                        //    .max('now') normal with no 18 restriction
        //                .required()
        //                .messages({
        //                 'date.base': 'Birth date must be a valid date',
        //                 'date.format': 'Birth date must be in YYYY-MM-DD format',
        //                 'date.max': 'You must be at least 18 years old',
        //                 'any.required': 'Birth date is required'
        //                })
    }
)

module.exports =employeeSchema
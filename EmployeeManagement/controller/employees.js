const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");
const auth = require("../middleWare/auth");
const employeeSchema=require("../validation/employeeValidate")

/**
 * @swagger
 * tags:
 *   - name: Employees
 *     description: API for managing employees
 */

const router = express.Router();

/**
 * @swagger
 * /api/employees/create:
 *   post:
 *     summary: Create new employee
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               national_id:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               department:
 *                 type: string
 *               position:
 *                 type: string
 *               manufacturer:
 *                 type: string
 *               model:
 *                 type: string
 *               serial_number:
 *                 type: string
 *     responses:
 *       201:
 *         description: Employee added successfully
 *       400:
 *         description: Bad request
 */

router.post("/create", auth, (req, res) => {
  const {error}=employeeSchema.validate(req.body)
  if(error) return res.status(400).json({msg: error.details[0].message})

  db.query("INSERT INTO employees SET ?", req.body, (err) => {
    if (err) return res.status(400).json(err);
    res.status(201).json({ message: "Employee created successfully" });
  });
});

/**
 * @swagger
 * /api/employees:
 *   get:
 *     summary: Get paginated employee list
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number (default 1, 5 items per page)
 *     responses:
 *       200:
 *         description: List of employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   firstname:
 *                     type: string
 *                   lastname:
 *                     type: string
 *                   national_id:
 *                     type: string
 *                   phone:
 *                     type: string
 *                   email:
 *                     type: string
 *                   department:
 *                     type: string
 *                   position:
 *                     type: string
 *                   manufacturer:
 *                     type: string
 *                   model:
 *                     type: string
 *                   serial_number:
 *                     type: string
 *       400:
 *         description: Bad request
 */

router.get("/", auth, (req, res) => {
  const page = req.query.page || 1; //current page number we get it by query parameter
  
  const limit = 5;

  const offset = (page - 1) * limit;
  db.query(
    "SELECT * FROM employees LIMIT ? OFFSET ?",
    [limit, offset],
    (err, results) => {
      if (err) return res.status(400).json(err);
      res.json(results);
    },
  );
});



/**
 * @swagger
 * /api/employees/{id}:
 *   put:
 *     summary: Update employee
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Employee ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               national_id:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               department:
 *                 type: string
 *               position:
 *                 type: string
 *               manufacturer:
 *                 type: string
 *               model:
 *                 type: string
 *               serial_number:
 *                 type: string
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Employee not found
 */




router.put("/:id", auth,(req,res)=>{

  console.log("PARAMS:", req.params);
  console.log("BODY:", req.body);


  const {id}=req.params;

  db.query("UPDATE employees SET ? WHERE id=?",[req.body, id],(err,result)=>{
    if(err) return res.status(400).json(err)
      
    if(result.affectedRows===0){
     return res.status(404).json({message:"user not found"})

     } 
        
     res.json({message:"employee updated successfully"});
  })

} )


/**
 * @swagger
 * /api/employees/{id}:
 *    delete:
 *      summary: Delete employee
 *      tags: [Employees]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *              type: integer
 *           description: Employee ID
 *      responses:
 *        200:
 *            description: employee deleted successfully
 *        404: 
 *            description: employee not found
 *        400: 
 *            description: bad request.
 */


router.delete("/:id", auth, (req,res)=>{

  const {id}=req.params

  db.query("DELETE FROM employees where id=?",[id],(err,result)=>{

    if(err) return res.status(400).json(err)

      if(result.affectedRows===0){
        return res.status(404).json({message:"Employee not found."})
      }
  })

  res.json({message:"employee deleted successfully"})

})

module.exports = router;

require("dotenv").config();

const express = require("express")
const app = express();
const db = require("./db") 
const cors = require("cors")

app.use(cors());
app.use(express.json())

//Get all Users
app.get("/api/v1/users", async(req,res) => {
    try{
        const results =  await db.query("select * from users")
    //Status code 200 means the get request was a success
    res.status(200).json({
        status:"success",
        results:results.rows.length,
        data : {
            users : results.rows
        },
    })
    }catch(error){
        console.log(error)
    }
})
//get Managers
app.get("/api/v1/users/managers", async (req, res) => {
    try {
        //results will consist of users whose role is a manager
        const results = await db.query("select * from users where _role = 'manager'")
    //Status code 200 means the GET request was a success
    res.status(200).json({
        status:"success",
        results:results.rows.length,
        data : {
            users : results.rows
        }, 
    })
    } catch (error) {
        console.log(error)
    }
})
//Get drivers
app.get("/api/v1/users/drivers", async (req, res) => {
    try {
        //results will consist of users whose role is a driver
        const results = await db.query("select * from users where _role = 'driver'")
    //Status code 200 means the GET request was a success
    res.status(200).json({
        status:"success",
        results:results.rows.length,
        data : {
            users : results.rows
        }, 
    })
    } catch (error) {
        console.log(error)
    }
})

//get Customers
app.get("/api/v1/users/customers", async (req, res) => { 
    try {
        //results will consist of users whose role is a customers
        const results = await db.query("select * from users where _role = 'customer'")
    //Status code 200 means the GET request was a success
    res.status(200).json({
        status:"success",
        results:results.rows.length,
        data : {
            users : results.rows
        }, 
    })
    } catch (error) {
        console.log(error)
    }
})
//Get a specific Customer
app.get("/api/v1/users/customers/:id", async (req,res) => {
    try {
        //results will consist of a particular user that has the same as the id provided
        const results = await db.query("select * from users WHERE id = $1",
        [req.params.id]);
        console.log(results)
    //Status code 200 means the Get request was a success
    res.status(200).json({
        status:"success",
        data:{
            user: results.rows[0]
        },
    });
    } catch (error) {
        console.log(error)
    }
})
//Get a Specific User
app.get("/api/v1/users/:id", async (req, res) => {
    try {
        //results will consist of a particular user that has the same as the id provided
        const results = await db.query("select * from users WHERE id = $1",
        [req.params.id]);
        console.log(results)
    //Status code 200 means the Get request was a success
    res.status(200).json({
        status:"success",
        data:{
            user: results.rows[0]
        },
    });
    } catch (error) {
        console.log(error)
    }
})


//get all the orders
app.get("/api/v1/orders", async (req, res) => {
    try {
        //results will consist of all of the orders that are in the database, regardless if a driver is assigned or not 
        const results = await db.query("select * from orders")
    //Status code 200 means the Get request was a success
    res.status(200).json({
        status:"success",
        results:results.rows.length,
        data:{
            orders: results.rows
        },
    })
    } catch (error) {
        console.log(error)
    }
})
//Get a order
app.get("/api/v1/orders/:id", async (req, res) => {
    try {
        //results will consist of a particular order that has the same as the id provided
        const results = await db.query("select * from orders WHERE id = $1",
        [req.params.id]);
        console.log(results)
    //Status code 200 means the Get request was a success
    res.status(200).json({
        status:"success",
        data:{
            order: results.rows[0]
        },
    });
    } catch (error) {
        console.log(error)
    }
})
//get all of the orders that have not been delivered
app.get("/api/v1/orders/active", async (req,res) => {
    try {
        //results will consist of all of the orders that have not been delivered
        const results = await db.query("select * from orders WHERE status != 'delivered'")
        //Status code 200 means that the Get request was a success
        res.status(200).json({
            status: "success", 
            results: results.rows.length, 
            data:{
                orders: results.rows
            }
        })
    } catch (error) {
        console.log(error)
    }
})


//Get all of the orders that have been delivered 
app.get("/api/v1/orders/delivered", async (req,res) => {
    try {
        //results will consist of all of the orders that have been delivered
        const results = await db.query("select * from orders WHERE status = 'delivered'")
        //Status code 200 means that the Get Request was a success
        res.status(200).json({
            status: 'success',
            results: results.rows.length,
            data:{
                orderes:results.rows
            }
        })
    } catch (error) {
        console.log(error)
    }
})

//Get all of the orders that have not been assigned a driver
app.get("/api/v1/orders/assigned", async (req,res) => {
    try {
        //results will consits of all of the orders who have not been assigned a driver
        const results = await db.query("select * from orders Where driver_id IS NULL")
        //Status code 200 means that Get request was a success. 
        res.status(200).json({
            status: 'success',
            results: results.rows.length,
            data:{
                orders:results.rows
            }
        })
    } catch (error) {
        console.log(error)
    }
})
//Get all of the orders that Have been assigned a driver
app.get("/api/v1/orders/unassigned", async (req,res) => {
    try {
        //results will consist of all of the orders that have been assigned a driver
        const results = await db.query("select * from orders where driver_id IS NOT NULL")
        //Status code 200 means that the GET request was a success
        res.status(200).json({
            status : 'success',
            results: results.rows.length,
            data:{
                orders:results.rows
            }
        })
    } catch (error) {
        console.log(error)
    }
})
//Get the orders of a specific driver
app.get("/api/v1/orders/driver/:id", async (req,res) =>{
    try {
        //results will consisit of all of the orders that are assigned to the specific driver
        const results = await db.query("select * from orders where driver_id = $1",
        [req.params.id]);
        //Status code 200 means the Get request was a success
        res.status(200).json({
            status:"success",
            results:results.rows.length,
            data:{
                orders: results.rows
        },
    })
    } catch (error) {
        console.log(error)
    }
})
//Get the Orders of a Specific Customer
app.get("/api/v1/orders/customer/:id" ,async (req,res) => {
    try {
        //results will consist of all of the orders that are ordered by the given customer
        const results = await db.query("select * from orders where customer_id = $1", 
        [req.params.id]);
        //Status code 200 means the Get request was a success
        res.status(200).json({
            status:"success",
            results:results.rows.length,
            data:{
                orders: results.rows
        },
        })
    } catch (error) {
        console.log(error)
    }
})
//Create a new Customer
app.post("/api/v1/user/newcustomer", async(req,res) => {
    try {
        //returning * means to return the instance that you have just created, postgres does not return by default
        //Can also return a single piece of info, * means all columns inserted. 
        //Results will consist of all of then info of the new customer, and will insert the new customer into the database
        const results = await db.query("INSERT INTO users (first_name,last_name,_role,username,password) values($1,$2,$3,$4,$5) returning *",
        [req.body.first_name,req.body.last_name, req.body._role,req.body.username,req.body.password])
        //Status code 201 means that the POST request and creation was a success
        res.status(201).json({
            status:"success",
            //position [0] means the first instance of results.rows is going to be returned, which in this case is the customer that we just created
            data :{
                user : results.rows[0]
            }
        })
    } catch (error) {
       console.log(error) 
    }
})
//Create a new Order
app.post("/api/v1/order/orders", async(req,res) => {
    console.log(req.body)
    try {
        //returning * means to return the instance that you have just created, postgres does not return by default
        //Can also return a single piece of info, * means all columns inserted. 
        //Results will consist of all of then info of the new order, and will insert the new order into the database
        const results = await db.query("INSERT INTO orders (customer_name,address,psi,stone,accelerator,retarder,yards,slump ,unload_method,special_in,customer_id) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) returning *",
        [req.body.customer_name, req.body.address,req.body.psi, req.body.stone, req.body.accelerator, req.body.retarder, req.body.yards, req.body.slump, req.body.unload_method,req.body.special_in,req.body.customer_id])
        //For clarity , console.log the reuslts
        console.log(results)
        //Status code 201 means that the POST request and creation was a success
        res.status(201).json({
            status : "success",
            //position [0], means the the first instance of results.rows is going to be returned, which in this case is the order that we have just created
            data: {
                order : results.rows[0]
            }
        })
    } catch (error) {
        console.log(error)
    }
})

//Update Order Status
//The id will allow us to update the correct Order, or the intended order. 
app.put("/api/v1/order/status/:id", async(req,res) => {
    try {
        //Results will consist of a Query that will update the status of an order that matches the id 
        //The id , or what is in the url, is always the last '$'
        const results = await db.query("UPDATE orders SET status = $1 WHERE id = $2 returning *",
         //Make sure to use req.params to get the id from the URL
        [req.body.status, req.params.id]);
        console.log(results)
        res.status(200).json({
            status: "success",
            data:{
                order: results.rows[0]
            }
        })
    } catch (error) {
        console.log(error)
    }
})

//Update The Driver_Id of an order
//This id will allow us to update the correct Order, or the intended order. 
app.put("/api/v1/order/driver/:id", async(req,res) => {
    try {
        //Results will consist of a Query that will update the driver_id of an order that matches the id 
        //The id , or what is in the url, is always the last '$'
        const results = await db.query("UPDATE orders SET driver_id = $1 WHERE id = $2 returning *",
        //Make sure to use req.params to get the id from the URL
        [req.body.driver_id, req.params.id]);
        console.log(results)
        res.status(200).json({
            status: "success",
            data:{
                order: results.rows[0]
            }
        })
    } catch (error) {
        console.log(error)
    }
})


const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`server is up and listening on port ${port}`)
})
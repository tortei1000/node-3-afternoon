require("dotenv").config()
const express = require("express")
const massive = require("massive")
const app = express()
const products_controller = require("./products_controller")

let {SERVER_PORT, CONNECTION_STRING} = process.env




massive(CONNECTION_STRING).then(dbInstance => {
  app.set('db', dbInstance);
  app.listen(SERVER_PORT, () => {
    console.log("listening at ", SERVER_PORT)
  })
}).catch(err=>console.log(`${err} error `))


app.post("/api/products", products_controller.create)
app.get("/api/products", products_controller.getAll)
app.get("/api/products/:id", products_controller.getOne)
app.put(`/api/products/:id`, products_controller.update)
app.delete("/api/products/:id", products_controller.delete)
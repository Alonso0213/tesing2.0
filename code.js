const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000
require("./config/route")

app.use(express.static("./static"), express.json())

app.listen(PORT, () => {
    console.log(`server = ${PORT}😎`);
})
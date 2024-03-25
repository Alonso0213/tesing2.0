const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static("./static"), express.json())

app.listen(PORT, () => {
    console.log(`server = ${PORT}😎`);
})
const express = require("express")
const bodyparser = require("body-parser")
const { check, validationResult} = require("express-validator")

const PORT = process.env.PORT || 8010
const cors = require("cors")

app = express()
app.use(bodyparser.json())
app.use(cors())

var allowed_operations = ["addition","subtraction","multiplication","division"]

app.post("/arithmetic",[
    check("operation_type").toLowerCase().isIn(allowed_operations).withMessage(`Expected operation: [${ allowed_operations }]`),
    check("x").isNumeric().withMessage("Must be an integer"),
    check("y").isNumeric().withMessage("Must be an integer")
], (req,res) => {
    const input_error = validationResult(req)
    if (!input_error.isEmpty()) {
        return res.status(422).json({ "Error": input_error.array() })
    }
    let {operation_type, x, y } = req.body
    let result
    switch (operation_type) {
        case "addition":
            result = x + y;
            break;
        case "subtraction":
            result = x - y;
            break;
        case "division":
            result = x / y;
            break;
        case "multiplication":
            result = x * y;
            break;
    }

    res.status(200).send({
        "slackUsername": "kehindebello",
        "result" : result,
        "operation_type" : operation_type
    })
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
    console.log(`Ctrl + C to cancel`)
})
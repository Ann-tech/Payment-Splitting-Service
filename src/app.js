const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;




app.get("/", (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Welcome to Annies payment Splitting Service. Check out the link on the path field for more info.",
        path: ""
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})
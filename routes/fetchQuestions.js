const express = require("express");
const router = express.Router();



router.get("/questions", async (req, res) => {
    try {
        res.status(200).json({
            Question: [
                {
                    question: "Do you like to have tea",
                    option: [
                        "yes", 'No'
                    ]

                },
                {
                    question: "Do you like to code everyday?",
                    option: [
                        "yes", 'No'
                    ]

                },
                {
                    question: "is it raining outside?",
                    option: [
                        "yes", 'No'
                    ]

                },

            ]
        });
    }
    catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});


module.exports = router;
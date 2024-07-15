const express = require("express");
const router = express.Router();
const Movies = require("../models/Movies");
const { validationResult, checkSchema } = require("express-validator");
const moviesValidator = require("../constants/movieValidation");
const moment = require("moment");

// Get All Movies List
router.get("/getAll", async (req, res) => {
	try {
		let MoviesItem = await Movies.find();
		if (MoviesItem) {
			// MoviesItem.forEach(element => {
			//     let date = new Date(element.releaseDate);
			//     console.log(date);
			//     let vaad = moment(date).format('YYYY-MM-DD');
			//     element.releaseDate = vaad;
			// });
			res.json(MoviesItem);
		} else {
			res.status(204).send();
		}
	} catch (err) {
		res.status(500).send(err);
	}
});

// Add Movie to the List

router.post("/add", checkSchema(moviesValidator), async (req, res) => {
	// Check for validation errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res
			.status(400)
			.send({ errors: errors.array(), Message: "Validation Error" });
	}
	let {
		name,
		description,
		poster,
		language,
		releaseDate,
		director,
		rating,
		cast,
	} = req.body;

	let MoviesItem = new Movies({
		name,
		description,
		poster,
		language,
		releaseDate,
		director,
		rating,
		cast,
	});

	try {
		await MoviesItem.save();
		res.status(200).send({ Message: "Movie Added Sucessfully" });
	} catch (err) {
		if (err.code == 11000)
			res.status(409).send({ Message: "Movie Already Exists" });
		else res.status(500).send(err);
	}
});

router.put("/:id", checkSchema(moviesValidator), async (req, res) => {
	const id = req.params.id;
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res
			.status(400)
			.send({ errors: errors.array(), Message: "Validation Error" });
	}
	Movies.findOneAndUpdate({ _id: id }, req.body, { new: true })
		.then((docs) => {
			if (docs) {
				res.status(200).send({ Message: "Movie Updated Sucessfully" });
			} else {
				res.status(400).send({ Message: "Error Updating Movie" });
			}
		})
		.catch((err) => {
			res.status(500).send("server error");
		});
});

router.delete("/:id", async (req, res) => {
	const id = req.params.id;
    Movies.findOneAndDelete({_id: id}).then((docs)=>{
        if(docs) {
            res.status(200).send({"Message":"Movie Deleted Sucessfully"});
        } else {
            res.status(400).send({"Message":"Error Deleting Movie"});
        }
    }).catch((err)=>{
        res.status(500).send('server error');
    })
});

router.get("/:id", async (req, res) => {
	try {
        const id = req.params.id;
        const MoviesItem = await Movies.findById(id);
        
        if (MoviesItem) {
            res.status(200).json(MoviesItem);
        } else {
            res.status(404).json({ "Message": "Movie not found" });
        }
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;

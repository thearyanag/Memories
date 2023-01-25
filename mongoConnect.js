require('dotenv').config()

const mongoose = require('mongoose')

/**
 * A function that connects to the DB.
 */
const mongoConnect = async () => {
	try {
		await mongoose
			.connect(process.env.DATABASE_URI)
			.then(() => console.log('Connected to DB!'))
			.catch((error) => {
				throw error
			})
	} catch (error) {
		throw error
	}
}

module.exports = mongoConnect

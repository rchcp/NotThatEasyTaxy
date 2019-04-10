var db = require('../db')

const Database = {
  async create(req, res) {
    const query = `INSERT INTO
                    available_trip(client_id, driver_id, orig_pos_lat, orig_pos_long, dest_pos_lat, dest_pos_long)
                    VALUES($1, $2, $3, $4, $5, $6)
                    returning *`
    const values = [
        req.params.clientID,
        req.params.driverID,
        req.body.orig_pos_lat,
        req.body.orig_pos_long,
        req.body.dest_pos_lat,
        req.body.dest_pos_long
    ]

    try {
      const { rows } = await db.db.query(query, values)
      return res.status(201).send(rows[0])
    } catch (error) {
      return res.status(400).send({ error: error })
    }
  },

  async delete(req, res) {
    const query = `DELETE FROM aviable_trip
                    WHERE trip_id = $1;`
    const values = [req.params.trip_id]

    try {
      const { rows } = await db.db.query(query, values)
      return res.status(201).send(rows[0])
    } catch (error) {
      return res.status(400).send({ error: error })
    }
  },

  async getDriverTrips(req, res) {
    const query = `SELECT * FROM aviable_trip
                    WHERE driver_id = $1;`
    const values = [req.body.driver_id]

    try {
      const { rows } = await db.db.query(query, values)

      var trips = []
      rows.array.forEach(trip => {
        trips.push({
          driver_id: trip.driver_id,
          client_id: trip.client_id,
          orig_pos_lat: trip.orig_pos_lat,
          orig_pos_long: trip.orig_pos_long,
          dest_pos_lat: dest_pos_lat,
          dest_pos_long: dest_pos_long
        })
      });

      return res.status(201).json(trips)
    } catch (error) {
      return res.status(400).json({ error: error })
    }
  },

  async get(req, res) {
    const query = `SELECT * FROM aviable_trip
                    WHERE trip_id = $1;`
    const values = [req.params.trip_id]

    try {
      const { rows } = await db.db.query(query, values)
      return res.status(201).send(rows[0])
    } catch (error) {
      return res.status(400).send({ error: error })
    }
  }
}

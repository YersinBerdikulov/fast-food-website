const axios = require('axios');
const User = require('../models/userModel');

exports.getFoodMenu = async (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://pizza-and-desserts.p.rapidapi.com/pizzas',
    headers: {
       'x-rapidapi-key': '1680a262a0msh45b47042ddc13eep1fdd40jsnce04ab85db24',
    'x-rapidapi-host': 'pizza-and-desserts.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    const pizzas = response.data; // Make sure this is an array of objects with the required fields

    let username = null;
    if (req.session.userId) {
      const user = await User.findById(req.session.userId);
      if (user) {
        username = user.username;
      }
    }

    res.render('food', { pizzas, username }); // Pass username to the template
  } catch (error) {
    console.error('Error fetching pizzas:', error);
    res.status(500).send('Error fetching pizzas');
  }
};

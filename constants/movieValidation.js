
const moviesValidator = {
    name: {
      isString: { errorMessage: "Name should be string" },
      notEmpty: { errorMessage: "Name is required" },
    },
    description: {
      isString: { errorMessage: "Description should be string" },
      notEmpty: { errorMessage: "Description is required" },
    },
    poster: {
      isString: { errorMessage: "Poster should be string" },
      notEmpty: { errorMessage: "Poster is required" },
    },
    language:{
      isString: { errorMessage: "Language should be string" },
      notEmpty: { errorMessage: "Language is required" },
    },
    releaseDate:{
      isDate: { errorMessage: "Release Date should be date" },
      notEmpty: { errorMessage: "Release Date is required" },
    },
    director:{
      isString: { errorMessage: "Director should be string" },
      notEmpty: { errorMessage: "Director is required" },
    },
    rating:{
      isNumeric: { errorMessage: "Rating should be number" },
    },
    cast:{
      isArray: { errorMessage: "Cast should be array" },
      notEmpty: { errorMessage: "Cast is required" },
    },
    "cast.*.name": {
      isString: { errorMessage: "Name should be string" },
      notEmpty: { errorMessage: "Name is required" },
    },
    "cast.*.profile": {
      isString: { errorMessage: "Profile should be string" },
      notEmpty: { errorMessage: "Profile is required" },
    },

  };
  module.exports = moviesValidator;
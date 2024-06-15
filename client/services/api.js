import axios from 'https://cdn.skypack.dev/axios';

const API_URL = "http://localhost:3000/api";
// const API_URL = 

// export const newUser = async (userData) => {
//   return axios.post(`${API_URL}/users/register`, userData)
//     .then(({ data }) => data)
//     .catch(error => {
//       throw error;
//     });
// }

// export const loginUser = async (userData) => {
//   console.log('axios')
//   return axios.post(`${API_URL}/login`, userData, {
//     params: {
//         user: userData._id
//     }
//   })
//     .then(({ data }) => data)
//     .catch(error => {
//       throw error;
//     });
// }

export const getAllExercises = async (userId) => {
  return axios.get(`${API_URL}/exercises`, {
    params: {
      user: userId,
    },
  })
  .then(({ data }) => data)
  .catch(error => {
    throw error;
  });
}

export const newExercise = async (userId, exerciseData) => {
  return axios.post(`${API_URL}/exercises`, exerciseData, {
      params: {
        user: userId,
      },
    })
    .then(({ data }) => data)
    .catch(error => {
      throw error;
    });
}

export const editExercise = async (exercise) => {
  return axios.put(`${API_URL}/exercises/${exercise._id}`, exercise)
    .then(({ data }) => data)
    .catch(error => {
      throw error;
    });
}

export const deleteExercise = async (exerciseId) => {
  return axios.delete(`${API_URL}/exercises/${exerciseId}`)
    .then(({ data }) => data)
    .catch(error => {
      throw error;
    });
}

export const deleteAllExercises = async (userId) => {
  return axios.delete(`${API_URL}/exercises/delete/all`, {
      params: {
        user: userId,
      },
    })
    .then(({ data }) => data)
    .catch(error => {
      throw error;
    });
}
import React from 'react'

const About = () => {
  return (
    <div className="about col-sm-12 col-md-8 col-lg-6">
        <h2 className="text-center">About</h2>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Info</th>
              <th scope="col">Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Developer</th>
              <td>Samuel Gonzalez</td>
            </tr>
            <tr>
              <th scope="row">Email</th>
              <td>samueldgt@gmail.com</td>
            </tr>
            <tr>
              <th scope="row">Phone Number</th>
              <td>+56 9 3582 4696</td>
            </tr>
            <tr>
              <th scope="row">Location</th>
              <td>Santiago, Chile</td>
            </tr>
          </tbody>
        </table>
      </div>
  )
}

export default About
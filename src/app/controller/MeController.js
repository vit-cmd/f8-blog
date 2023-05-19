import db from '../model/index.js';
const Courses = db.courses;

class MeController {
  // [GET] /me/stored/courses
  storedCourses(req, res, next) {
    Promise.all([
      Courses.findAll({where: {
        deletedAt: false
      }}), 
      Courses.count({where: {
        deletedAt: true
      }})
    ])
    .then(([courses, deletedCount]) => {
      const data = courses.map(e => e.dataValues);
      res.render('me/stored-courses', {
        deletedCount,
        courses: data,
    })
    })
    .catch(next);
  }

  // [GET] /me/trash/courses
  trashCourses(req, res, next) {
      Courses.findAll({where: {
        deletedAt: true
      }})
      .then((courses) => {
        const data = courses.map(e => e.dataValues);
        res.render('me/trash-courses', {
          courses: data,
      })
      })
      .catch(next);
  }
}

export const meController = new MeController;
import db from '../model/index.js';
const Courses = db.courses;

class SiteController {
    // [GET] /
    index(req, res, next) {
      Courses.findAll({})
        .then((courses) => {
          const data = courses.map((e) => e.dataValues);
          res.render('home', {
              courses: data,
          });
        })
        .catch(next);
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

export const siteController = new SiteController;

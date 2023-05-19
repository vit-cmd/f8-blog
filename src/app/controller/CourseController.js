import db from '../model/index.js';
import { NOW, Sequelize } from 'sequelize';
const Courses = db.courses;

class CourseController {
    // [GET] /courses/:slug
    show(req, res, next) {
      Courses.findOne({ slug: req.params.slug })
        .then((course) => {
          res.render('courses/show', {
              course: course.dataValues,
          })
        })
        .catch(next);
    }

    // [GET] /courses/create
    create(req, res, next) {
      res.render('courses/create');
    }

    // [POST] /courses/store
    store(req, res, next) {
      req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
      const course = new Courses(req.body);
      course.slug = req.body.name.toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');

      course
        .save()
        .then(() => res.redirect('/course/create'))
        .catch((error) => {});
    }

  // [GET] /courses/:id/edit
  edit(req, res, next) {
    Courses.findOne({id: req.params.id})
      .then((course) =>{
        console.log(course.dataValues);
        res.render('courses/edit', {
          course: course.dataValues,
        })
      })
      .catch(next);
  }

  // // [PUT] /courses/:id
  update(req, res, next) {
    req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
      const course = new Courses(req.body);
      delete course.dataValues.id;
      course.slug = req.body.name.toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
    const id = parseInt(req.params.id);
    
    Courses.update(course.dataValues, {where: {id}})
      .then(() => res.redirect(`/course/${id}/edit`))
      .catch(next);
  }

  // [DELETE] /courses/:id
  destroy(req, res, next) {
    const id = parseInt(req.params.id);
    Courses.update({deletedAt: true},{ where: {id} })
      .then(() => res.redirect('back'))
      .catch(next);
  }

  // [DELETE] /courses/:id/force
  forceDestroy(req, res, next) {
    const id = parseInt(req.params.id);
    Courses.destroy({ where: {id} })
      .then(() => res.redirect('back'))
      .catch(next);
  }

  // [PATCH] /courses/:id/restore
  restore(req, res, next) {
    const id = parseInt(req.params.id);
    Courses.update({deletedAt: false},{ where: {id} })
      .then(() => res.redirect('back'))
      .catch(next);
  }
}

export const courseController = new CourseController;

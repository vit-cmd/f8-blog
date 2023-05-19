import siteRouter from "./site.js";
import meRouter from "./me.js";
import courseRouter from "./course.js";
import newsRouter from "./news.js";

export function router(app) {
  app.use('/', siteRouter);
  app.use('/me', meRouter);
  app.use('/course', courseRouter);
  app.use('/news', newsRouter);
}

import { create } from 'express-handlebars';
import path from 'path';

/**
 * Lấy template đã được render với dữ liệu truyền vào
 * @param {*} templateName
 * @param {*} data
 * @return {*}
 */
const getTemplate = async (templateName, data) => {
  try {
    const templatePath = path.join(
      path.resolve(),
      'src',
      'views',
      'templates',
      `${templateName}.hbs`
    );
    const hbs = create({
      extname: '.hbs',
      defaultLayout: false,
    });

    const template = await hbs.render(templatePath, data);
    return template;
  } catch (error) {
    console.error('Error rendering template:', error);
    throw error;
  }
};

export { getTemplate };

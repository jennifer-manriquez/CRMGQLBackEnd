const courses = [
  {
    title: 'JavaScript Moderno Guía Definitiva Construye +10 Proyectos',
    technology: 'JavaScript ES6',
  },
  {
    title: 'React – La Guía Completa: Hooks Context Redux MERN +15 Apps',
    technology: 'React',
  },
  {
    title: 'Node.js – Bootcamp Desarrollo Web inc. MVC y REST API’s',
    technology: 'Node.js'
  },
  {
    title: 'ReactJS Avanzado – FullStack React GraphQL y Apollo',
    technology: 'React'
  }
];

//resolvers
const resolvers = {
  Query: {
    getCourses: (_, {input}, ctx, info) => 
    {
      console.log(ctx);
      const result = courses.filter(course => course.technology === input.technology);
      return result;
    }
  }
}

module.exports = resolvers;
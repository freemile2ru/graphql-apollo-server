const db = require('../models');

module.exports = function resolvers () {
  const models = db;

  return {
    RootQuery: {
        user (root, { id }, context) {
            return models.User.findById(id, context);
        },
        users (root, args, context) {
            return models.User.findAll({}, context);
        },
        todos (root, args, context) {
            return models.Todo.findAll({}, context);
        },
        todo (root, { id }, context) {
            return models.Todo.findById(id, context);
        }
    },
    RootMutation: {
        createUser (root, { input }, context) {
            return models.User.create(input, context);    
        },
        async updateUser(root, { id, input }, context) {
            const user = await models.User.findById(id)
            return user.update(input, { ...context, where: { id }, fields: Object.keys(input) });
        },
        async removeUser (root, { id }, context) {
            const user = await models.User.findById(id)
            await user.destroy()
            return user;
        },
        createTodo (root, { input }, context) {
            return models.Todo.create(input, context);    
        },
        async updateTodo(root, { id, input }, context) {
            const todo = await models.Todo.findById(id)
            return todo.update(input, { ...context, where: { id }, fields: Object.keys(input) });
        },
        async removeTodo (root, { id }, context) {
            const todo = await models.Todo.findById(id)
            await todo.destroy()
            return todo;
        },
    },
  };
}

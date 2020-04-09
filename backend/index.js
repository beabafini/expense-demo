const app = require("express")();
const expressGraphql = require("express-graphql");
const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Expense {
    id: ID
    userName: String
    type: String
    description: String
    value: Int
    refundable: Boolean
  }
  type Query {
    expense(id: ID!): Expense
    expenses: [Expense]
  }
  type Mutation {
    createExpense(userName: String!, type: String!, description: String!, value: Int!, refundable: Boolean!): Expense
    updateExpense(id: ID!, userName: String, type: String, description: String, value: Int, refundable: Boolean): Expense
    deleteExpense(id: ID!) : Expense
  }
`);

const providers = {
    expenses: []
};

let id = 1;

const resolvers = {
  expense({ id }) {
    return providers.expenses.find(item => item.id === Number(id));
  },
  expenses() {
    return providers.expenses;
  },
  createExpense({ userName, type, description, value, refundable }) {
    const expense = {
      id: id++,
      userName,
      type,
      description,
      value,
      refundable
    };

    providers.expenses.push(expense);

    return expense;
  },
  updateExpense({ id, userName, type, description, value, refundable }) {
    providers.expenses.map(expense => {
      if (expense.id == id) {
        expense.userName = userName,
        expense.type = type,
        expense.description = description,
        expense.value = value,
        expense.refundable = refundable;

        return expense;
      }
    });
    return providers.expenses.filter(expense => expense.id == id)[0];
  },
  deleteExpense({ id }) {
    var index = providers.expenses.map(expense => { return expense.id }).indexOf(Number(id));
    if (index != -1) {
      providers.expenses.splice(index, 1);
    }

    return id;
  }
};

app.use(
    "/graphql",
    expressGraphql({
      schema,
      rootValue: resolvers,
      graphiql: true
    })
);
  
app.listen(3000);
const chai = require('chai');
const subSet = require('chai-subset');

const index = require('../index');

chai.use(subSet);

const expenseSchema = {
    id: id => id,
    userName: userName => userName,
    type: type => type,
    description: description => description,
    value: value => value,
    refundable: refundable => refundable
};

describe('Teste das funções', () => {
    it('findAllExpenses', () => {
        index.resolvers.createExpense({ userName: 'beatriz', type: 'alimento', description: 'alimento', value: 50, refundable: true});
        index.resolvers.createExpense({ userName: 'otávio', type: 'alimento', description: 'alimento', value: 100, refundable: false});

        const expenses = index.resolvers.findAllExpenses();
        chai.expect(expenses.length).to.be.equals(2);
        chai.expect(expenses).to.containSubset([expenseSchema]);
    });

    it('findExpenseById', () => {
        index.resolvers.createExpense({ userName: 'julia', type: 'alimento', description: 'alimento', value: 50, refundable: true});
        index.resolvers.createExpense({ userName: 'lucas', type: 'alimento', description: 'alimento', value: 100, refundable: false});

        const expense = index.resolvers.findExpenseById({ id: 1 });
        chai.expect(expense.id).to.be.equals(1);
        chai.expect(expense).to.containSubset(expenseSchema);
    });

    it('createExpense', () => {
        const expense = index.resolvers.createExpense({
            userName: 'amanda', 
            type: 'alimento', 
            description: 'alimento', 
            value: 50, 
            refundable: true});
        chai.expect(expense).to.containSubset(expenseSchema);
    });

    it('updateExpense', () => {
        index.resolvers.createExpense({ userName: 'pedro', type: 'alimento', description: 'alimento', value: 50, refundable: true});
        
        const expense = index.resolvers.updateExpense({ id: '1', userName: 'bruna', type: 'viagem', description: 'viagem', value: 100, refundable: false});
        chai.expect(expense.userName).to.not.be.equals('pedro');
    });
    
    it('deleteExpense', () => {
        index.resolvers.createExpense({ userName: 'rodrigo', type: 'alimento', description: 'alimento', value: 50, refundable: true});

        const id = index.resolvers.deleteExpense({ id: 1 });
        chai.expect(id).to.be.equals(1);
    });
})
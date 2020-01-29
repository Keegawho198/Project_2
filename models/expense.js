module.exports = function (sequelize, DataTypes) {
    var Expense = sequelize.define("User", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        class: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    Expense.associate = function (models) {
        Expense.belongsTo(models.Budget, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    
    return Expense;
};


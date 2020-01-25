module.exports = function (sequelize, DataTypes) {
    var Budget = sequelize.define("Budget", {
        // new comment 1
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    Budget.associate = function (models) {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        Budget.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Budget;
};
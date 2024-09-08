const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      // Define associations here
    }
  }

  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      headline: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM('businessOwner', 'serviceSeeker'),
        defaultValue: 'serviceSeeker',
      },
      // profilePicture: {
      //   type: DataTypes.BLOB('long'), // BLOB type for storing image data
      //   allowNull: true,
      // },
    },
    {
      sequelize,
      modelName: 'User',
      timestamps: true,
    }
  )

  return User
}

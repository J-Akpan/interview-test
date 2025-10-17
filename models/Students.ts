import { DataTypes, Sequelize, Model, Optional } from "sequelize"
import db_connect from "../config/db_config";
import Tutor from "./Tutor";


// Define the attributes for the User model
interface UserAttributes {
    studentId: string;
    userId: string;
    grade: string;
    interests: string;
    bio: string;
    tutoredCourse: string;
    learningStyle: string;

}

interface UserCreationAttributes extends Optional<UserAttributes, 'studentId' | 'userId' | 'grade' | 'interests' | 'bio' | 'tutoredCourse' | 'learningStyle'> { }
// Define the User model class
class Student extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    declare studentId: string;
    declare userId: string;
    declare grade: string;
    declare interests: string;
    declare bio: string;
    declare tutoredCourse: string;
    declare learningStyle: string;
    // timestamps!
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}


//initialize
Student.init({
    studentId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    grade: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    interests: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bio: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tutoredCourse: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    learningStyle: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: db_connect,
    modelName: 'Student',
    tableName: 'students',
    timestamps: true,

});

// relationship

export default Student;

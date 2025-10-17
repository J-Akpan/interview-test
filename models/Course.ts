import { DataTypes, Sequelize, Model, Optional } from "sequelize"
import db_connect from "../config/db_config";
import Tutor from "./Tutor";


// Define the attributes for the User model
interface UserAttributes {
    courseId: string;
    name: string;
    description: string;
    duration: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'courseId' |
    'name' | 'description' | 'duration'> { }

//declare
class Course extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    declare courseId: string;
    declare name: string;
    declare description: string;
    declare duration: string;

    // timestamps!
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

//initialize    
Course.init({
    courseId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    duration: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
    {
        sequelize: db_connect,
        modelName: 'Course',
        tableName: 'courses',
        timestamps: true,
    }
)

//models associations
Course.hasMany(Tutor, { foreignKey: 'courseId' });

export default Course;


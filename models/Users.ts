import { DataTypes, Sequelize, Model, Optional } from "sequelize"
import db_connect from "../config/db_config";
import Tutor from "./Tutor";
import Student from "./Students";


// Define the attributes for the User model
interface UserAttributes {
    userId: string;
    name: string;
    email: string;
    avatar: string | null
    role: 'tutor' | 'student';
    experience: string;
    education: string;
    educationStartYear: string;
    educationEndYear: string;
    schoolName: string;
    certification: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'userId' |
    'name' | 'email' | 'avatar' | 'role' | 'experience'
    | 'education' | 'educationStartYear' | 'educationEndYear' | 'schoolName' | 'certification'> { }

// Define the User model class
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    declare userId: string;
    declare name: string;
    declare email: string
    declare avatar: string
    declare experience: string;
    declare education: string;
    declare educationStartYear: string;
    declare educationEndYear: string;
    declare schoolName: string;
    declare certification: string;
    declare role: 'tutor' | 'student';

    // timestamps!
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

//initialize
User.init({
    userId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    experience: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    education: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    educationStartYear: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    educationEndYear: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    schoolName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    certification: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    role: {
        type: DataTypes.ENUM('tutor', 'student'),
        allowNull: false,
        defaultValue: 'student'
    }
},
    {
        sequelize: db_connect,
        modelName: 'User',
        tableName: 'users',
        timestamps: true,
    }
)

//models associatikons
User.hasMany(Tutor, { foreignKey: 'userId' });
Tutor.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Student, { foreignKey: 'userId' });
Student.belongsTo(User, { foreignKey: 'userId' });
export default User;



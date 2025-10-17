import { DataTypes, Sequelize, Model, Optional } from "sequelize"
import db_connect from "../config/db_config";
import Schedule from "./Schedules";

// Define the attributes for the User model
interface UserAttributes {
    tutorId: string;
    userId: string;
    bio: string;
    tutoredCourse: string
}

interface UserCreationAttributes extends Optional<UserAttributes, 'tutorId' |
    'bio' | 'tutoredCourse'> { }

// Define the User model class
class Tutor extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    declare tutorId: string;
    declare userId: string;
    declare bio: string;
    declare tutoredCourse: string;

    // timestamps!
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

//initialize
Tutor.init({
    tutorId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
    },
    bio: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    tutoredCourse: {
        type: DataTypes.STRING,
        allowNull: true,
    }
},
    {
        sequelize: db_connect,
        modelName: 'Tutor',
        tableName: 'tutors',
        timestamps: true,
    }
)

//models associations
Tutor.hasMany(Schedule, { foreignKey: 'tutorId' });
Schedule.belongsTo(Tutor, { foreignKey: 'tutorId' });



export default Tutor;


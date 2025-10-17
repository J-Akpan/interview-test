import { DataTypes, Sequelize, Model, Optional } from "sequelize"
import db_connect from "../config/db_config";
import Tutor from "./Tutor";
import Booking from "./Booking";



// Define the attributes for the User model
interface UserAttributes {
    scheduleId: string;
    tutorId: string;
    scheduleDate: string;
    startTime: string;
    endTime: string;
    status: 'available' | 'booked' | 'cancelled';
}

interface UserCreationAttributes extends Optional<UserAttributes, 'scheduleId' |
    'tutorId' | 'scheduleDate' | 'startTime' | 'endTime' | 'status'> { }

// Define the User model class
class Schedule extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    declare scheduleId: string;
    declare tutorId: string;
    declare scheduleDate: string;
    declare startTime: string;
    declare endTime: string;
    declare status: 'available' | 'booked' | 'cancelled';

    // timestamps!
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

//initialize
Schedule.init({
    scheduleId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    tutorId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    scheduleDate: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    startTime: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    endTime: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('available', 'booked', 'cancelled'),
        allowNull: false,
    }
},
    {
        sequelize: db_connect,
        modelName: 'Schedule',
        tableName: 'schedules',
        timestamps: true,
    }
)

//models associations

export default Schedule;
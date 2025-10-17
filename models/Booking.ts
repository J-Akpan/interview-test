import { DataTypes, Sequelize, Model, Optional } from "sequelize"
import db_connect from "../config/db_config";
import Schedule from "./Schedules";

// Define the attributes for the User model
interface UserAttributes {
    bookingId: string;
    tutorId: string;
    studentId: string;
    scheduleId: string;
    bookingDate: string
    startTime: string;
    endTime: string;
    status: 'pending' | 'confirmed' | 'cancelled';
}

interface UserCreationAttributes extends Optional<UserAttributes, 'bookingId' |
    'tutorId' | 'studentId' | 'scheduleId' | 'bookingDate' | 'startTime' | 'endTime' | 'status'> { }   

// declare
class Booking extends Model<UserAttributes, UserCreationAttributes> 
    implements UserAttributes{
        
    declare bookingId: string;
    declare tutorId: string;
    declare studentId: string;
    declare scheduleId: string;
    declare bookingDate: string;
    declare startTime: string;
    declare endTime: string;
    declare status: 'pending' | 'confirmed' | 'cancelled';

    // timestamps!
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;   
    }

    //initialize
    Booking.init({
        bookingId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        tutorId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        studentId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        scheduleId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        bookingDate: {
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
            type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
            allowNull: false,
        }
    },
        {
            sequelize: db_connect,
            modelName: 'Booking',
            tableName: 'bookings',
            timestamps: true,
        }
    )
    
    //models associations

    export default Booking;
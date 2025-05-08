import { Model, Table, Column, DataType } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

interface IStaffCreationAttr {
  full_name: string;
  role: string;
  phone: string;
  email: string;
  password: string;
}

@Table({ tableName: "staffs" })
export class Staff extends Model<Staff, IStaffCreationAttr> {
  @ApiProperty({ example: 1, description: "Unique ID of the staff" })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: "Alice Johnson",
    description: "Full name of the staff",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  declare full_name: string;

  @ApiProperty({ example: "manager", description: "Role of the staff member" })
  @Column({ type: DataType.STRING, allowNull: false })
  declare role: string;

  @ApiProperty({
    example: "+998901234567",
    description: "Phone number of the staff",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  declare phone: string;

  @ApiProperty({ example: "staff@example.com", description: "Email address" })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare email: string;

  @ApiProperty({ example: "hashed_password", description: "Hashed password" })
  @Column({ type: DataType.STRING, allowNull: false })
  declare password: string;

  @ApiProperty({ example: "refresh_token_value", description: "Refresh token" })
  @Column({ type: DataType.STRING, allowNull: true })
  declare refresh_token: string;

  @ApiProperty({ example: "2025-01-01T00:00:00Z", description: "Hiring date" })
  @Column({ type: DataType.DATE, allowNull: true })
  declare hired_at: Date;

  @ApiProperty({ example: true, description: "Is staff active?" })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare is_active: boolean;

  @ApiProperty({
    example: "activation-uuid-123",
    description: "Activation link",
  })
  @Column({ type: DataType.STRING, allowNull: true })
  declare activation_link: string;
}

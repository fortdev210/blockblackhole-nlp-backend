import bcrypt from "bcryptjs";

import { AppDataSource } from "@/setup/datasource"
import { UserEntity } from "@/entities/user.entity"
import { error } from "console";

const seed = async() => {
    await AppDataSource.initialize()
    console.log("Data source initialized", process.env.ADMIN_NAME, process.env.ADMIN_PASSWORD)
    const userRepo = AppDataSource.getRepository(UserEntity)

    const hashedPasswordForNormalTestUser = await bcrypt.hash("password", 10)
    const hashedPasswordForTestAdmin = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10)

    await userRepo.insert([
        {name: "testuser", hashedPassword: hashedPasswordForNormalTestUser},
        {name: process.env.ADMIN_NAME, hashedPassword: hashedPasswordForTestAdmin, role: "admin"}
    ])
}

seed().catch(error => {
    console.log("Error seeding database: ", error)
})
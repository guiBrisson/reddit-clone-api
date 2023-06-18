import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: 'reddit-clone',
      autoLoadEntities: true,
      synchronize: false, // Setting synchronize: true shouldn't be used in production - otherwise you can lose production data. 
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }

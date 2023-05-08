/* eslint-disable prettier/prettier */
import { EntityRepository, Repository } from 'typeorm';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { Foods } from "./food.entity";
import { Injectable } from '@nestjs/common';

@Injectable()
@EntityRepository(Foods)
export class FoodsRepository extends Repository<Foods> {

}
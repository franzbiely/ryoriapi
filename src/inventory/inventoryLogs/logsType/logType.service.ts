/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LogsType } from './logType.entity';
import { CreateLogsTypeDto } from './dto/create-logType.dto';

@Injectable()
export class LogsTypeService {
  constructor(
    @InjectRepository(LogsType)
    private logsTypeRepository: Repository<LogsType>,
  ) {}

  //Get All User
  findAll(): Promise<LogsType[]> {
    return this.logsTypeRepository.find({});
  }

  findOne(id: number): Promise<LogsType> {
    const x = this.logsTypeRepository.findOneBy({ id });
    return x;
  }

  async create(_logsType: CreateLogsTypeDto): Promise<LogsType> {
    const logsType = new LogsType();
    logsType.add = _logsType.add;
    logsType.thaw = _logsType.thaw;
    logsType.throw = _logsType.throw;
    return this.logsTypeRepository.save(logsType);
  }

  async update(id: number, logsType: LogsType) {
    await this.logsTypeRepository.update(id, logsType);
  }

  async remove(id: number): Promise<void> {
    await this.logsTypeRepository.delete(id);
  }
}

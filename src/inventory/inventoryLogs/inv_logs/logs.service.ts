/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvLogs } from './logs.entity';
import { CreateInvLogsDto } from './dto/create-logs.dto';

@Injectable()
export class InvLogsService {
  constructor(
    @InjectRepository(InvLogs)
    private invLogsRepository: Repository<InvLogs>,
  ) {}

  //Get All User
  findAll(): Promise<InvLogs[]> {
    return this.invLogsRepository.find({});
  }

  findOne(id: number): Promise<InvLogs> {
    const x = this.invLogsRepository.findOneBy({ id });
    return x;
  }

  async create(_logs: CreateInvLogsDto): Promise<InvLogs> {
    const logs = new InvLogs();
    logs.type = _logs.type;
    logs.quantity = _logs.quantity;
    return this.invLogsRepository.save(logs);
  }

  async update(id: number, inv_logs: InvLogs) {
    await this.invLogsRepository.update(id, inv_logs);
  }

  async remove(id: number): Promise<void> {
    await this.invLogsRepository.delete(id);
  }
}

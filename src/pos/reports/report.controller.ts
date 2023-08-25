/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Param, Body, Delete, Patch } from "@nestjs/common";
import { ReportService } from "./report.service";
import { CreateReportDto } from "./dto/create-report.dto";
import { UpdateReportDto } from "./dto/update-report.dto";



@Controller('report')
export class ReportController {
    constructor(private reportService: ReportService) {}

    @Get()
    async fillAll() {
        return this.reportService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
      return this.reportService.findOne(+id);
    }

    @Post()
    create(@Body() createReportDto: CreateReportDto) {
        return this.reportService.create(createReportDto);
        
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateReportDto: UpdateReportDto) {
        //  this.reportService.update(+id, updateReportDto);
         return "Updated"
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        this.reportService.remove(+id);
      return "Deleted!";
    }
}
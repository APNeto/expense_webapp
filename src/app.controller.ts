import { Controller, Get, Post, Put, Delete, Param, Body } from "@nestjs/common";
import { data, ReportType } from "./data";

@Controller("report/:type")
export class AppController {
  @Get()
  getAllReports(@Param('type') type: string) {
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE;
    const res = (data.report.filter(report => report.type === reportType))
    const jsonRes = JSON.stringify(res)
    return jsonRes
  }

  @Get(":id")
  getReportById(@Param('type') type: string, @Param('id') id: string) {
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE;
    return JSON.stringify(data.report.filter(report => report.type === reportType).find(report => report.id === id))
  }

  @Post()
  createReport(@Param('type') type: string, @Body() body: {
    amount: number;
    source: string;
  }) {
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE;
    const newReport = {
      id: "uuid" + String(data.report.length),
      amount: body.amount,
      source: body.source,
      created_at: new Date(),
      updated_at: new Date(),
      type: reportType
    }
    data.report.push(newReport)

    return JSON.stringify(newReport)
  }

  @Put(":id")
  putIncomeReportById(@Param('type') type: string, @Param('id') id: string, @Body() body: {
    amount: number;
    source: string;
  }) {
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE;
    const reportIndex = data.report.filter(report => report.type === reportType).findIndex(report => report.id === id)
    console.log("ReportIndex:", reportIndex)
    console.log("Indexed object:", data.report[reportIndex])
    data.report[reportIndex].amount = body.amount;
    data.report[reportIndex].source = body.source;
    return JSON.stringify(data.report[reportIndex]);
  }

  @Delete(":id")
  deleteIncomeReportById(@Param('type') type: string, @Param('id') id: string) {
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE;
    const reportIndex = data.report.filter(report => report.type === reportType).findIndex(report => report.id === id)
    if (reportIndex) {
      delete data.report[reportIndex];
    }
    return JSON.stringify({ success: true });
  }
}


using System;
using System.Data;
using DataContext.DBModel;
using DataModel.DTOModel;
using System.Linq;
using System.Collections.Generic;




namespace Interface.IDataService
{
    public interface IExpensesRepository : IGenericRepository<expenses>
    {
        List<DtoExpenses> selectAllBySettlement(int accountantId);
        List<DtoExpenses> selectAllByProjectId(int projectId, string type);
        List<DtoExpenses> selectAllByType(string type);
        List<DtoExpenses> selectAllByType2(string type);

        List<DtoExpenses> selectAll();

        List<DtoExpenses> selectExpensesRpt(int type, DateTime startDate, DateTime finishDate);
        DtoExpenses selectById(int id);
        List<DtoExpenses> selectByProjectIdRpt(int projectId, DateTime startDate, DateTime finishDate);
        List<DtoExpenses> selectByTypeRpt(int type, DateTime startDate, DateTime finishDate);
        List<DtoExpenses> selectByProjectIdDetailRpt(int projectId, DateTime startDate, DateTime finishDate, int type);
        List<DtoExpenses> getCustodyStatment(int accountant);
    }
}


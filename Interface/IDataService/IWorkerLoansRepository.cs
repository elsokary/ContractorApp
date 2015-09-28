using System;
using System.Data;
using DataContext.DBModel;
using DataModel.DTOModel;
using System.Linq;
using System.Collections.Generic;




namespace Interface.IDataService
{
    public interface IWorkerloansRepository : IGenericRepository<workerLoans>
    {
        IQueryable<DtoWorkerloans> selectAll(int projectId, string lang);
        List<DtoWorkerloans> selectAll();

        //WriteMethod2

        DtoWorkerloans selectById(int id);



    }
}


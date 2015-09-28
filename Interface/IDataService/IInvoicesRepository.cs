using System;
using System.Data;
using DataContext.DBModel;
using DataModel.DTOModel;
using System.Linq;
using System.Collections.Generic;




namespace Interface.IDataService
{
    public interface IInvoicesRepository : IGenericRepository<invoices>
    {
        List<DtoInvoices> selectAllByProject(int projectId);

        //WriteMethod2

        DtoInvoices selectById(int id, string lang);



    }
}


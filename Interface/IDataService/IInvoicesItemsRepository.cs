using System;
using System.Data;
using DataContext.DBModel;
using DataModel.DTOModel;
using System.Linq;
using Interface.IDataService;
using System.Collections.Generic; 




namespace InterfaceI.DataService
{
    public interface IInvoicesitemsRepository : IGenericRepository<invoicesItems>
    {
        List<DtoInvoicesitems> selectAll(int projectId );
         
        DtoInvoicesitems selectById(int id, string lang);

        List<DtoInvoicesitems> selectForNewInvoice(int projectId);
        List<DtoInvoicesitems> selectForEditInvoice(int projectId);
        double? selectTotal(int projectId);

    }
}


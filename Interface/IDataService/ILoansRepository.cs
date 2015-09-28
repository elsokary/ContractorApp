using System;
using System.Data;
using DataContext.DBModel;
using DataModel.DTOModel;
using System.Linq;
using System.Collections.Generic;




namespace Interface.IDataService
{
    public interface ILoansRepository : IGenericRepository<loans>
    {
        List<DtoLoans> selectAll();
        List<DtoLoans> getLoansByContacts(int contactId);
        List<DtoLoans> getLoansItemsByContacts(int contactId);
        DtoLoans selectById(int id, string lang);



    }
}


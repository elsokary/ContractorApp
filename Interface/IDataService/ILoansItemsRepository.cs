using System;
using System.Data;
using DataContext.DBModel;
using DataModel.DTOModel;
using System.Linq;
using System.Collections.Generic;
using DataServices.Repository;




namespace Interface.IDataService
{
    public interface ILoansItemsRepository : IGenericRepository<loansItems>
    {
        List<DtoLoansItems> selectAll();

        List<DtoLoansItems> selectByLoanId();
        DtoLoansItems selectById(int id, string lang);



    }
}


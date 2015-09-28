using DataContext.DBModel;
using DataModel.DTOModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;




namespace Interface.IDataService
{
    public interface IChequesRepository:IGenericRepository<cheques>
    {
        List<DtoCheques> selectAllByProject(int projectId);
        List<DtoCheques> selectByCompany(int company, DateTime startDate, DateTime finishDate);
	DtoCheques selectById(int id, string lang); 
	
	

    }
}


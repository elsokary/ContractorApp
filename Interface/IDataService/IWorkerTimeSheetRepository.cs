using System;
using System.Data;
using DataContext.DBModel;
using DataModel.DTOModel;
using System.Linq;
using System.Collections.Generic;




namespace Interface.IDataService
{
    public interface IWorkertimesheetRepository:IGenericRepository<workerTimeSheet>
    {
        List<DtoWorkertimesheet> selectAll(int projectId);
        List<DtoWorkertimesheet> selectAll(); 
	 
	DtoWorkertimesheet selectById(int id ); 
	
	

    }
}


using System;
using System.Data;
using DataContext.DBModel;
using DataModel.DTOModel;
using System.Linq;
using System.Collections.Generic;




namespace Interface.IDataService
{
    public interface ISubcontractorsitemsRepository:IGenericRepository<subContractorsItems>
    {
        List<DtoSubcontractorsitems> selectAll(int projectId ); 
	
	//WriteMethod2

	DtoSubcontractorsitems selectById(int id, string lang); 
	
	

    }
}


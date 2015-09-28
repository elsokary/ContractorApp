using System;
using System.Data;
using DataContext.DBModel;
using DataModel.DTOModel;
using System.Linq;
using System.Collections.Generic;




namespace Interface.IDataService
{
    public interface ISubcontractorscustodyRepository:IGenericRepository<subContractorsCustody>
    {
        List<DtoSubcontractorscustody> selectAll(int projectId); 
	
	//WriteMethod2

	DtoSubcontractorscustody selectById(int id, string lang); 
	
	

    }
}


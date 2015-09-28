using System;
using System.Data;
using DataContext.DBModel;
using DataModel.DTOModel;
using System.Linq;
using System.Collections.Generic;




namespace Interface.IDataService
{
    public interface IProjectssubcontractorsRepository:IGenericRepository<projectsSubContractors>
    {
        List<DtoProjectssubcontractors> selectAll(int projectId); 
	
	//WriteMethod2

	DtoProjectssubcontractors selectById(int id); 
	
	

    }
}


using System;
using System.Data;
using DataContext.DBModel;
using DataModel.DTOModel;
using System.Linq;
using System.Collections.Generic;




namespace Interface.IDataService
{
    public interface IProjectsRepository:IGenericRepository<projects>
    {
        List<DtoProjects> selectAll( ); 
	
	//WriteMethod2

	DtoProjects selectById(int id ); 
	
	

    }
}


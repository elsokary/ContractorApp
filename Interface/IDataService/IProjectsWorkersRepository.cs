using System;
using System.Data;
using DataContext.DBModel;
using DataModel.DTOModel;
using System.Linq;




namespace Interface.IDataService
{
    public interface IProjectsworkersRepository:IGenericRepository<projectsWorkers>
    {
        IQueryable<DtoWorkers> selectAll(int projectId); 
	
	//WriteMethod2

	DtoProjectsworkers selectById(int id); 
	
	

    }
}


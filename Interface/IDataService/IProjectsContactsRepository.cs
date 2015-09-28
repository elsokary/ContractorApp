using System;
using System.Data;
using DataContext.DBModel;
using DataModel.DTOModel;
using System.Linq;




namespace Interface.IDataService
{
    public interface IProjectscontactsRepository:IGenericRepository<projectsContacts>
    {
        IQueryable<DtoProjectscontacts> selectAll(int projectId, string lang); 
	
	//WriteMethod2

	DtoProjectscontacts selectById(int id, string lang); 
	
	

    }
}


using System;
using System.Data;
using DataContext.DBModel;
using DataModel.DTOModel;
using System.Linq;




namespace Interface.IDataService
{
    public interface IInventoryprojectreleaseRepository:IGenericRepository<inventoryProjectRelease>
    {
        IQueryable<DtoInventoryprojectrelease> selectAll(int projectId); 
	
	//WriteMethod2

	DtoInventoryprojectrelease selectById(int id, string lang); 
	
	

    }
}


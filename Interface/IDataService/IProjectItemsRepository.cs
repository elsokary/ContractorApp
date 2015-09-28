using System;
using System.Data;
using DataContext.DBModel;
using DataModel.DTOModel;
using System.Linq;
using Interface.IDataService;
using System.Collections.Generic;




namespace Interface.IDataService
{
    public interface IProjectItemsRepository : IGenericRepository<projectItems>
    {
        List<DtoProjectItems> selectAll(int projectId);

        DtoProjectItems selectById(int id);



    }
}


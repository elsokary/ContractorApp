using System;
using System.Data;
using DataContext.DBModel;
using DataModel.DTOModel;
using System.Linq;




namespace Interface.IDataService
{
    public interface IUsersRepository : IGenericRepository<users>
    {
        IQueryable<DtoUsers> selectAll();

        //WriteMethod2

        DtoUsers selectById(int id);



    }
}


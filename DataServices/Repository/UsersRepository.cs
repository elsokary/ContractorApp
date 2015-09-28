 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataServices.Repository;
using DataContext.DBModel;
using Interface.IDataService;
using DataModel.DTOModel;



namespace DataServices.Repository
{
    public class UsersRepository : GenericRepository<SharktyContext, users>, IUsersRepository
    {

        public IQueryable<DtoUsers> selectAll()
        {
            var list = new List<DtoUsers>();

            list = (from q in Context.users

                    select new DtoUsers
                    {
                        userName = q.userName,
                        userPassword = q.userPassword,
                        fullName = q.fullName,
                    }).ToList();
            return list.AsQueryable();
        }

        public DtoUsers selectById(int id)
        {
            var list = new DtoUsers();
            list = (from q in Context.users
                    where q.id == id
                    select new DtoUsers
                    {
                        userName = q.userName,
                        userPassword = q.userPassword,
                        fullName = q.fullName,
                        editPassword = q.editPassword,
                        deletePassword = q.deletePassword,
                        id = q.id
                    }).FirstOrDefault();

            return list;
        }




    }
}


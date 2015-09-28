 
using Interface.IDataService;
using DataContext.DBModel;
using DataModel.DTOModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataServices.Repository;



namespace DataServices.Repository
{
    public class ProjectsworkersRepository : GenericRepository<SharktyContext, projectsWorkers>, IProjectsworkersRepository
    {

        public IQueryable<DtoWorkers> selectAll(int projectId)
        {
            var list = new List<DtoWorkers>();
 
                list = (from q in Context.projectsWorkers
                        where q.projectId == projectId
                        select new DtoWorkers
                        {
                            projectId = q.projectId,
                            id = q.id,
                            workerId = q.workerId,
                            fullname = q.workers.fullname,
                            phone = q.workers.phone,
                            socialCardNumber = q.workers.socialCardNumber,
                            address = q.workers.address
                        }).ToList();
            return list.AsQueryable();
        }

        public DtoProjectsworkers selectById(int id)
        {
            var list = new DtoProjectsworkers();
 
                list = (from q in Context.projectsWorkers
                        where q.id == id
                        select new DtoProjectsworkers
                        {
                            projectId = q.projectId,
                            workerId = q.workerId,
                        }).FirstOrDefault();
            return list;
        }




    }
}


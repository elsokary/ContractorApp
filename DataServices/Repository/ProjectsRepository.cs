 
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
    public class ProjectsRepository : GenericRepository<SharktyContext, projects>, IProjectsRepository
    {

        public List<DtoProjects> selectAll()
        {
            var list = new List<DtoProjects>();

            list = (from q in Context.projects.Include("companies.companyName")

                    select new DtoProjects
                    {
                        id = q.id,
                        companyId = q.companyId,
                        companyName = q.companies.companyName,
                        projectName = q.projectName,
                        address = q.address,
                        phone = q.phone,
                        fax = q.fax,
                        email = q.email,
                        startDate = q.startDate,
                        finishDate = q.finishDate

                    }).ToList();

            return list;

        }

        public DtoProjects selectById(int id)
        {
            var list = new DtoProjects();

            list = (from q in Context.projects
                    where q.id == id
                    select new DtoProjects
                    {
                        companyId = q.companyId,
                        projectName = q.projectName,
                        address = q.address,
                        phone = q.phone,
                        fax = q.fax,
                        email = q.email,
                        startDate = q.startDate,
                        finishDate = q.finishDate,
                    }).FirstOrDefault();
            return list;
        }

    }
}


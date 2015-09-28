 
using Interface.IDataService;
using DataContext.DBModel;
using DataModel.DTOModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataServices.Repository;



namespace Procoor_V4_DataService.Repository
{
    public class ProjectscontactsRepository : GenericRepository<SharktyContext, projectsContacts>, IProjectscontactsRepository
    {

        public IQueryable<DtoProjectscontacts> selectAll(int projectId, string lang)
        {
            var list = new List<DtoProjectscontacts>();
            if (lang == "en")
            {
                list = (from q in Context.projectsContacts
                        where q.projectId == projectId
                        select new DtoProjectscontacts
                        {
                            projectId = q.projectId,
                            fullname = q.fullname,
                            address = q.address,
                            phone = q.phone,
                            socialCardNumber = q.socialCardNumber,
                            email = q.email,
                        }).ToList();
            }
            else
            {
                list = (from q in Context.projectsContacts
                        where q.projectId == projectId
                        select new DtoProjectscontacts
                        {
                            projectId = q.projectId,
                            fullname = q.fullname,
                            address = q.address,
                            phone = q.phone,
                            socialCardNumber = q.socialCardNumber,
                            email = q.email,
                        }).ToList();
            } return list.AsQueryable();
        }

        //WriteMethod2

        public DtoProjectscontacts selectById(int id, string lang)
        {
            var list = new DtoProjectscontacts();
            if (lang == "en")
            {
                list = (from q in Context.projectsContacts
                        where q.id == id
                        select new DtoProjectscontacts
                        {
                            projectId = q.projectId,
                            fullname = q.fullname,
                            address = q.address,
                            phone = q.phone,
                            socialCardNumber = q.socialCardNumber,
                            email = q.email,
                        }).FirstOrDefault();
            }
            else
            {
                list = (from q in Context.projectsContacts
                        where q.id == id
                        select new DtoProjectscontacts
                        {
                            projectId = q.projectId,
                            fullname = q.fullname,
                            address = q.address,
                            phone = q.phone,
                            socialCardNumber = q.socialCardNumber,
                            email = q.email,
                        }).FirstOrDefault();
            } return list;
        }




    }
}


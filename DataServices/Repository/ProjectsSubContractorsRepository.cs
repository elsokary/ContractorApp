 
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
    public class ProjectssubcontractorsRepository : GenericRepository<SharktyContext, projectsSubContractors>, IProjectssubcontractorsRepository
    {

        public List<DtoProjectssubcontractors> selectAll(int projectId)
        {
            var list = new List<DtoProjectssubcontractors>();

            list = (from q in Context.projectsSubContractors.Include("subContractors")
                    where q.projectId == projectId
                    select new DtoProjectssubcontractors
                    {
                        id=q.id,
                        projectId = q.projectId,
                        contractorName = q.subContractors.companyName,
                        phone = q.subContractors.phone,
                        fax = q.subContractors.fax,
                        email = q.subContractors.email,
                        address = q.subContractors.address,
                        contractorId = q.contractorId,
                    }).ToList();
            return list;
        }

        public DtoProjectssubcontractors selectById(int id)
        {
            var list = new DtoProjectssubcontractors();

            list = (from q in Context.projectsSubContractors
                    where q.id == id
                    select new DtoProjectssubcontractors
                    {
                        projectId = q.projectId,
                        contractorId = q.contractorId,
                    }).FirstOrDefault();
            return list;
        }




    }
}


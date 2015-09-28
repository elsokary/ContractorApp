 
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
    public class SubcontractorscustodyRepository : GenericRepository<SharktyContext, subContractorsCustody>, ISubcontractorscustodyRepository
    {

        public List<DtoSubcontractorscustody> selectAll(int projectId)
        {
            var list = new List<DtoSubcontractorscustody>();

            list = (from q in Context.subContractorsCustody.Include("projects.projectName").Include("subContractors.companyName")

                    where q.projectId == projectId

                    select new DtoSubcontractorscustody
                    {
                        id = q.id,
                        contractorId = q.contractorId,
                        contractorName = q.subContractors.companyName,
                        projectId = q.projectId,
                        projectName = q.projects.projectName,
                        custodyDate = q.custodyDate,
                        total = q.total,
                        notes = q.notes

                    }).ToList();

            return list;
        }

        public DtoSubcontractorscustody selectById(int id, string lang)
        {
            var list = new DtoSubcontractorscustody();
            if (lang == "en")
            {
                list = (from q in Context.subContractorsCustody
                        where q.id == id
                        select new DtoSubcontractorscustody
                        {
                            contractorId = q.contractorId,

                            projectId = q.projectId,
                            custodyDate = q.custodyDate,
                            total = q.total,
                            notes = q.notes,
                        }).FirstOrDefault();
            }
            else
            {
                list = (from q in Context.subContractorsCustody
                        where q.id == id
                        select new DtoSubcontractorscustody
                        {
                            contractorId = q.contractorId,
                            projectId = q.projectId,
                            custodyDate = q.custodyDate,
                            total = q.total,
                            notes = q.notes,
                        }).FirstOrDefault();
            } return list;
        }




    }
}


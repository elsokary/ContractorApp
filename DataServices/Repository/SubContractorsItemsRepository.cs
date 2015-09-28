 
using Interface.IDataService;
using DataContext.DBModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataModel.DTOModel;
using DataServices.Repository;



namespace DataServices.Repository
{
    public class SubcontractorsitemsRepository : GenericRepository<SharktyContext, subContractorsItems>, ISubcontractorsitemsRepository
    {
        public List<DtoSubcontractorsitems> selectAll(int projectId)
        {
            var list = new List<DtoSubcontractorsitems>();

            list = (from q in Context.subContractorsItems.Include("subContractors.companyName").Include("projects.projectName")

                    where q.projectId == projectId

                    select new DtoSubcontractorsitems
                    {
                        id = q.id,
                        contractorId = q.contractorId,
                        contractorName = q.subContractors.companyName,
                        projectId = q.projectId,
                        projectName = q.projects.projectName,
                        description = q.description,
                        unit = q.unit,
                        quantity = q.quantity,
                        unitPrice = q.unitPrice,
                        total = q.total,
                        item_date = q.item_date,
                        notes = q.notes

                    }).ToList();

            return list;
        }

        public DtoSubcontractorsitems selectById(int id, string lang)
        {
            var list = new DtoSubcontractorsitems();
            if (lang == "en")
            {
                list = (from q in Context.subContractorsItems
                        where q.id == id
                        select new DtoSubcontractorsitems
                        {
                            contractorId = q.contractorId,
                            projectId = q.projectId,
                            description = q.description,
                            unit = q.unit,
                            quantity = q.quantity,
                            unitPrice = q.unitPrice,
                            total = q.total,
                            item_date = q.item_date,
                            notes = q.notes,
                        }).FirstOrDefault();
            }
            else
            {
                list = (from q in Context.subContractorsItems
                        where q.id == id
                        select new DtoSubcontractorsitems
                        {
                            contractorId = q.contractorId,
                            projectId = q.projectId,
                            description = q.description,
                            unit = q.unit,
                            quantity = q.quantity,
                            unitPrice = q.unitPrice,
                            item_date = q.item_date,
                            total = q.total,
                            notes = q.notes,
                        }).FirstOrDefault();
            } return list;
        }


    }
}


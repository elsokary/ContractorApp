 
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
    public class InventoryprojectreleaseRepository : GenericRepository<SharktyContext, inventoryProjectRelease>, IInventoryprojectreleaseRepository
    {

        public IQueryable<DtoInventoryprojectrelease> selectAll(int projectId)
        {
            var list = new List<DtoInventoryprojectrelease>();
            list = (from q in Context.inventoryProjectRelease
                    join i in Context.inventory on q.inventoryItemId equals i.id
                    where q.projectId == projectId
                    select new DtoInventoryprojectrelease
                    {
                        id = q.id,
                        inventoryItemId = q.inventoryItemId,
                        projectId = q.projectId,
                        quantity = q.quantity,
                        description = i.description
                    }).ToList();

            return list.AsQueryable();
        }

        //WriteMethod2

        public DtoInventoryprojectrelease selectById(int id, string lang)
        {
            var list = new DtoInventoryprojectrelease();
            if (lang == "en")
            {
                list = (from q in Context.inventoryProjectRelease
                        where q.id == id
                        select new DtoInventoryprojectrelease
                        {
                            inventoryItemId = q.inventoryItemId,
                            projectId = q.projectId,
                            quantity = q.quantity,
                        }).FirstOrDefault();
            }
            else
            {
                list = (from q in Context.inventoryProjectRelease
                        where q.id == id
                        select new DtoInventoryprojectrelease
                        {
                            inventoryItemId = q.inventoryItemId,
                            projectId = q.projectId,
                            quantity = q.quantity,
                        }).FirstOrDefault();
            } return list;
        }




    }
}


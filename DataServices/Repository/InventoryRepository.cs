using DataContext.DBModel;
using Interface.IDataService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataModel.DTOModel;

namespace DataServices.Repository
{
    public class InventoryRepository : GenericRepository<SharktyContext, inventory>, IInventoryRepository
    {
        public List<DtoInventory> selectAllRemaining()
        {
            var list = (from q in Context.inventory
                        where q.remainingQauntity > 0
                        select new DtoInventory
                        {
                            id = q.id,
                            description = q.description,
                            remainingQauntity = q.remainingQauntity,
                            quantity = q.quantity,
                            releasedQuantity = q.releasedQuantity,
                            unit = q.unit,
                            unitPrice = q.unitPrice
                        }).ToList();
            return list;
        }
        public List<DtoInventory> selectById(int id)
        {
            var list = (from q in Context.inventory
                        where q.id == id
                        select new DtoInventory
                        {
                            id = q.id,
                            description = q.description,
                            remainingQauntity = q.remainingQauntity,
                            quantity = q.quantity,
                            releasedQuantity = q.releasedQuantity,
                            unit = q.unit,
                            unitPrice = q.unitPrice
                        }).ToList();
            return list;
        }
    }
}

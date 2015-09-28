 
using Interface.IDataService;
using DataContext.DBModel;
using DataModel.DTOModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataServices.Repository;
using InterfaceI.DataService;



namespace DataServices.Repository
{
    public class ProjectItemsRepository : GenericRepository<SharktyContext, projectItems>, IProjectItemsRepository
    {

        public List<DtoProjectItems> selectAll(int projectId)
        {
            var list = new List<DtoProjectItems>();
            list = (from q in Context.projectItems
                    where q.projectId == projectId
                    select new DtoProjectItems
                    {
                        id = q.id,
                        description = q.description,
                        unit = q.unit,
                        unitPrice = q.unitPrice,
                        arrange = q.arrange
                    }).ToList();


            return list;
        }

        public DtoProjectItems selectById(int id)
        {
            var list = new DtoProjectItems();
            list = (from q in Context.projectItems
                    where q.id == id
                    select new DtoProjectItems
                    {
                        description = q.description,
                        unit = q.unit,
                        unitPrice = q.unitPrice,
                        arrange = q.arrange
                    }).FirstOrDefault();

            return list;
        }




    }
}


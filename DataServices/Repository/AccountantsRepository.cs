using DataContext.DBModel;
using DataModel.DTOModel;
using Interface.IDataService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataServices.Repository
{
    public class AccountantsRepository : GenericRepository<SharktyContext, accounters>, IAccountantsRepository
    {
        public List<DtoFinancialcustody> getfinancialCustody()
        {
            var list = new List<DtoFinancialcustody>();

            list = (from q in Context.projects
                    let total = Context.financialCustody.Where(x => x.projectId == q.id).Select(x => x.total).ToList().Sum()
                    select new DtoFinancialcustody
                    {
                        projectName = q.projectName,
                        total = total
                    }).ToList().Where(x => x.total > 0).ToList();
            return list;
        }

        public List<DtoFinancialcustody> getfinancialCustodyByProject(int projectId, DateTime startDate, DateTime finishDate)
        {
            var list = new List<DtoFinancialcustody>();

            list = (from q in Context.financialCustody
                    where q.projectId == projectId && q.custodyDate >= startDate && q.custodyDate <= finishDate
                    select new DtoFinancialcustody
                    {
                        accounterName = q.accounters.fullname,
                        projectName = q.projects.projectName,
                        total = q.total,
                        custodyDate = q.custodyDate,
                        notes = q.notes
                    }).ToList();
            return list;
        }

        public List<DtoFinancialcustody> getfinancialCustodyByAccountant(int accountantId, DateTime startDate, DateTime finishDate)
        {
            var list = new List<DtoFinancialcustody>();

            list = (from q in Context.financialCustody
                    where q.accounterId == accountantId && q.custodyDate >= startDate && q.custodyDate <= finishDate
                    select new DtoFinancialcustody
                    {
                        accounterName = q.accounters.fullname,
                        projectName = q.projects.projectName,
                        total = q.total,
                        custodyDate = q.custodyDate,
                        notes = q.notes
                    }).ToList();
            return list;
        }

    }
}

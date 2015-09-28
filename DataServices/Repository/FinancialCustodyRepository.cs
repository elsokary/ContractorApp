 
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
    public class FinancialcustodyRepository : GenericRepository<SharktyContext, financialCustody>, IFinancialcustodyRepository
    {

        public List<DtoFinancialcustody> selectAll()
        {
            var list = new List<DtoFinancialcustody>();

            list = (from q in Context.financialCustody

                    select new DtoFinancialcustody
                    {
                        id = q.id,
                        projectId = q.projectId,
                        projectName = q.projects.projectName,
                        accounterName = q.accounters.fullname,
                        accounterId = q.accounterId,
                        total = q.total,
                        custodyDate = q.custodyDate,
                        notes = q.notes,
                    }).ToList();
            return list;
        }
        public List<DtoFinancialcustody> selectAllBySettlement(int accountantId)
        {
            var list = new List<DtoFinancialcustody>();

            list = (from q in Context.financialCustody
                    where q.accounterId == accountantId && q.isSettlement != true
                    select new DtoFinancialcustody
                    {
                        id = q.id,
                        projectId = q.projectId,
                        projectName = q.projects.projectName,
                        accounterName = q.accounters.fullname,
                        accounterId = q.accounterId,
                        total = q.total,
                        custodyDate = q.custodyDate,
                        notes = q.notes,
                    }).ToList();
            return list;
        }

        public DtoSettlements getSettlementsByAccountant(int accountantId)
        {

            var list = (from q in Context.accounters

                        where q.id == accountantId
                        let total = Context.financialCustody.Where(x => x.isSettlement != true && x.accounterId == accountantId).ToList().Sum(x => x.total)
                        let expenses = Context.expenses.Where(x => x.isSettlement != true && x.accountantId == accountantId).ToList().Sum(x => x.total)
                        let firstDate = Context.financialCustody.Where(x => x.isSettlement == true && x.accounterId == accountantId).OrderByDescending(x => x.discussDate).FirstOrDefault().discussDate
                        select new DtoSettlements
                        {
                            total = total,
                            expenses = expenses,
                            balance = total - expenses,
                            startDate = firstDate

                        }).FirstOrDefault();
            return list;
        }

        public DtoFinancialcustody selectById(int id, string lang)
        {
            var list = new DtoFinancialcustody();
            if (lang == "en")
            {
                list = (from q in Context.financialCustody
                        where q.id == id
                        select new DtoFinancialcustody
                        {
                            projectId = q.projectId,
                            accounterId = q.accounterId,
                            total = q.total,
                            custodyDate = q.custodyDate,
                            notes = q.notes,
                        }).FirstOrDefault();
            }
            else
            {
                list = (from q in Context.financialCustody
                        where q.id == id
                        select new DtoFinancialcustody
                        {
                            projectId = q.projectId,
                            accounterId = q.accounterId,
                            total = q.total,
                            custodyDate = q.custodyDate,
                            notes = q.notes,
                        }).FirstOrDefault();
            } return list;
        }




    }

}

 
using Interface.IDataService;
using DataContext.DBModel;
using DataModel.DTOModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks; 



namespace DataServices.Repository
{
    public class ExpensesRepository : GenericRepository<SharktyContext, expenses>, IExpensesRepository
    {

        public List<DtoExpenses> selectAllBySettlement(int accountantId)
        {
            var list = new List<DtoExpenses>();

            list = (from q in Context.expenses
                    where q.isSettlement != true && q.accountantId == accountantId
                    select new DtoExpenses
                    {
                        id = q.id,
                        projectId = q.projectId,
                        projectName = q.projects.projectName,
                        expenseTypeName = q.expensesTypes.title,
                        expenseTypeId = q.expenseTypeId,
                        quantity = q.quantity,
                        unitPrice = q.unitPrice,
                        total = q.total,
                        expenseDate = q.expenseDate,
                    }).OrderByDescending(x => x.id).ToList();
            return list;
        }
        public List<DtoExpenses> selectAll()
        {
            var list = new List<DtoExpenses>();

            list = (from q in Context.expenses
                    // where q.projectId == projectId
                    select new DtoExpenses
                    {
                        id = q.id,
                        projectId = q.projectId,
                        projectName = q.projects.projectName,
                        expenseTypeName = q.expensesTypes.title,
                        expenseTypeId = q.expenseTypeId,
                        quantity = q.quantity,
                        unitPrice = q.unitPrice,
                        total = q.total,
                        expenseDate = q.expenseDate,
                    }).OrderByDescending(x => x.id).ToList();
            return list;
        }

        public DtoExpenses selectById(int id)
        {
            var list = new DtoExpenses();

            list = (from q in Context.expenses
                    where q.id == id
                    select new DtoExpenses
                    {
                        id = q.id,
                        projectId = q.projectId,
                        expenseTypeId = q.expenseTypeId,
                        quantity = q.quantity,
                        unitPrice = q.unitPrice,
                        total = q.total,
                        expenseDate = q.expenseDate,
                    }).FirstOrDefault();
            return list;
        }

        public List<DtoExpenses> selectAllByProjectId(int projectId, string type)
        {
            var list = new List<DtoExpenses>();

            list = (from q in Context.expenses
                    where q.projectId == projectId
                    && q.expenseTypeId == Context.expensesTypes.FirstOrDefault(x => x.type == type).id
                    select new DtoExpenses
                    {
                        id = q.id,
                        projectId = q.projectId,
                        projectName = q.projects.projectName,
                        expenseTypeName = q.expensesTypes.title,
                        expenseTypeId = q.expenseTypeId,
                        quantity = q.quantity,
                        unitPrice = q.unitPrice,
                        total = q.total,
                        expenseDate = q.expenseDate,
                    }).OrderByDescending(x => x.id).ToList();
            return list;
        }
        public List<DtoExpenses> selectAllByType(string type)
        {
            var list = new List<DtoExpenses>();

            list = (from q in Context.expenses
                    where q.expensesTypes.type == type
                    select new DtoExpenses
                    {
                        id = q.id,
                        projectId = q.projectId,
                        projectName = q.projects.projectName,
                        expenseTypeName = q.expensesTypes.title,
                        expenseTypeId = q.expenseTypeId,
                        quantity = q.quantity,
                        unitPrice = q.unitPrice,
                        total = q.total,
                        expenseDate = q.expenseDate,
                        accountName = q.accounters.fullname,
                        editable = q.expenseTypeId != 1 && q.expenseTypeId != 2 ? true : false
                    }).OrderByDescending(x => x.id).ToList();

            return list;
        }
        public List<DtoExpenses> selectAllByType2(string type)
        {
            var list = new List<DtoExpenses>();

            list = (from q in Context.expenses
                    where q.expensesTypes.type == type
                    select new DtoExpenses
                    {
                        id = q.id,
                        //projectId = q.projectId,
                        //projectName = q.projects.projectName,
                        expenseTypeName = q.expensesTypes.title,
                        expenseTypeId = q.expenseTypeId,
                        quantity = q.quantity,
                        unitPrice = q.unitPrice,
                        total = q.total,
                        expenseDate = q.expenseDate,
                    }).ToList().OrderByDescending(x => x.id).ToList();

            return list;
        }

        public List<DtoExpenses> selectByProjectIdRpt(int projectId, DateTime startDate, DateTime finishDate)
        {
            var list = new List<DtoExpenses>();

            list = (from q in Context.expenses
                    join e in Context.expensesTypes on q.expenseTypeId equals e.id
                    //let sumExpenses = Context.expenses.Where(x => x.projectId == projectId && x.expenseTypeId == q.expenseTypeId && q.expenseDate >= startDate && q.expenseDate <= finishDate).ToList().Select(x => x.total).Sum()
                    where q.projectId == projectId
                    && q.expenseDate >= startDate
                    && q.expenseDate <= finishDate
                    group q by new { e.id, e.title } into g
                    select new DtoExpenses
                    {
                        id = g.Key.id,
                        expenseTypeName = g.Key.title,
                        total = g.Sum(i => i.total)
                    }).ToList();
            return list;
        }
        public List<DtoExpenses> selectByTypeRpt(int type, DateTime startDate, DateTime finishDate)
        {
            var list = new List<DtoExpenses>();
            list = (from q in Context.expensesTypes
                    join x in Context.expenses on q.id equals x.expenseTypeId
                    where q.type == type.ToString() && x.expenseDate >= startDate && x.expenseDate <= finishDate
                    group x by new { q.title, q.id } into g
                    select new DtoExpenses
                    {
                        id = g.Key.id,
                        expenseTypeName = g.Key.title,
                        total = g.Sum(x => x.total)
                    }).ToList();


            //group x by q.title into g
            //select new DtoExpenses
            //{
            //    id = q.id,
            //    //expenseTypeName = q.expensesTypes.title,
            //    //total = sumExpenses
            //}).ToList().GroupBy(p => p.expenseTypeName).Select(g => g.First()).ToList();


            //list = (from q in Context.expenses
            //        let sumExpenses = Context.expenses.Where(x => x.expensesTypes.type == type.ToString() && x.expenseTypeId == q.expenseTypeId).ToList().Select(x => x.total).Sum()
            //        where q.expenseDate >= startDate
            //        && q.expenseDate <= finishDate
            //        select new DtoExpenses
            //        {
            //            id = (int)q.expenseTypeId,
            //            expenseTypeName = q.expensesTypes.title,
            //            total = sumExpenses
            //        }).ToList().GroupBy(p => p.expenseTypeName).Select(g => g.First()).ToList();
            return list;
        }

        public List<DtoExpenses> selectByProjectIdDetailRpt(int projectId, DateTime startDate, DateTime finishDate, int type)
        {
            var list = new List<DtoExpenses>();

            list = (from q in Context.expenses.Include("projects")

                    where q.projectId == projectId
                    && q.expenseDate >= startDate
                    && q.expenseDate <= finishDate
                    & q.expenseTypeId == type
                    select new DtoExpenses
                    {
                        expenseTypeName = q.expensesTypes.title,
                        total = q.total,
                        quantity = q.quantity,
                        unitPrice = q.unitPrice,
                        expenseDate = q.expenseDate,
                        projectName = q.projects.projectName
                    }).ToList();

            return list;
        }

        public List<DtoExpenses> selectExpensesRpt(int type, DateTime startDate, DateTime finishDate)
        {
            var list = new List<DtoExpenses>();

            list = (from q in Context.expenses
                    let accountantName = Context.financialCustody.FirstOrDefault(x => x.projectId == q.projectId).projects.financialCustody.FirstOrDefault(x => x.projectId == q.projectId).accounters.fullname

                    where q.expensesTypes.id == type
                   && q.expenseDate >= startDate
                   && q.expenseDate <= finishDate
                    select new DtoExpenses
                    {
                        accountName = q.expensesTypes.type == "1" ? accountantName : "خارج حسابات المشاريع",
                        expenseTypeName = q.expensesTypes.title,
                        total = q.total,
                        quantity = q.quantity,
                        unitPrice = q.unitPrice,
                        expenseDate = q.expenseDate,
                        projectName = q.projects.projectName
                    }).ToList();
            return list;
        }

        public List<DtoExpenses> getCustodyStatment(int accountant)
        {
            var list = new List<DtoExpenses>();

            var statment = Context.financialCustody.Where(x => (x.isDiscuss != true) && x.accounterId == accountant).OrderByDescending(x => x.id).FirstOrDefault();
            if (statment != null)
            {


                DateTime? currentDate = DateTime.Now.Date;

                list = (from q in Context.expenses.Where(x => x.projectId == statment.projectId)

                        where q.expenseDate >= statment.custodyDate
                                 && q.expenseDate <= currentDate
                        select new DtoExpenses
                        {
                            expenseTypeName = q.expensesTypes.title,
                            description = q.description,
                            total = q.total,
                            quantity = q.quantity,
                            unitPrice = q.unitPrice,
                            expenseDate = q.expenseDate,
                            projectName = q.projects.projectName
                        }).ToList();

                #region temp Code

                /*
                //var listSalary = (from q in Context.projectsWorkers.Include("workers").Where(x => x.projectId == statment.projectId)
                //                  //let loan = Context.workerLoans.Where(x => x.workerId == q.workerId
                //                  //                                      && DbFunctions.TruncateTime(x.workDate) >= DbFunctions.TruncateTime(statment.custodyDate)
                //                  //                                      && DbFunctions.TruncateTime(x.workDate) <= DbFunctions.TruncateTime(currentDate)).Select(x => x.total).ToList().Sum()
                //                  let totalDays = Context.workerTimeSheet.Where(x => x.workerId == q.workerId
                //                      && x.payed == true
                //                      && x.projectId == statment.projectId
                //                      && DbFunctions.TruncateTime(x.payedDate) >= DbFunctions.TruncateTime(statment.custodyDate)
                //                      && DbFunctions.TruncateTime(x.payedDate) <= DbFunctions.TruncateTime(currentDate)).Select(x => x.quantity).ToList().Sum()
                //                  select new DtoWorkertimesheet
                //                 {
                //                     workerName = q.workers.fullname,
                //                     unitPrice = q.workers.daySalary,
                //                     totalDays = totalDays,
                //                     total = q.workers.daySalary * totalDays,
                //                     remaining = ((q.workers.daySalary ?? 0) * (totalDays ?? 0)) //- (loan ?? 0)

                //                 }).ToList().Where(x => x.totalDays > 0).ToList();

                //listSalary.ForEach(delegate(DtoWorkertimesheet item)
                //{
                //    list.Add(new DtoExpenses { expenseTypeName = "  قبض عمال  " + item.workerName, total = item.remaining, projectName = statment.projects.projectName });
                //});

                //listSalary.Where(x => x.loans > 0).ToList().ForEach(delegate(DtoWorkertimesheet item)
                //{

                //    list.Add(new DtoExpenses { expenseTypeName = " سلف عمال " + item.workerName, total = item.loans, projectName = statment.projects.projectName });
                //});
                //var result = Context.workerTimeSheet.Where(x => x.projectId == statment.projectId && x.payed == true && x.workDate >= statment.custodyDate && x.workDate <= currentDate).Select(x => x.total).ToList().Sum();
                //list.Add(new DtoExpenses { expenseTypeName = "قبض عمال ", total = result, projectName = statment.projects.projectName });
                 */
                #endregion
            }

            return list;
        }

    }
}


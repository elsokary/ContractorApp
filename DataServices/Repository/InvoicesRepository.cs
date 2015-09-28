 
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
    public class InvoicesRepository : GenericRepository<SharktyContext, invoices>, IInvoicesRepository
    {

        public List<DtoInvoices> selectAllByProject(int projectId)
        {

            var maxID = (from q in Context.invoices
                         where q.projectId == projectId
                         select q.id).Max();

            var list = new List<DtoInvoices>();

            list = (from q in Context.invoices
                    where q.projectId == projectId
                    select new DtoInvoices
                    {
                        id = q.id,
                        projectId = q.projectId,
                        projectName = q.projects.projectName,
                        invoiceNumber = q.invoiceNumber,
                        invoicesDate = q.invoicesDate,
                        total = q.total,
                        insurancePercent = q.insurancePercent,
                        insuranceValue = q.insuranceValue,
                        editable = q.id == maxID ? true : false
                    }).ToList();
            return list;
        }

        //WriteMethod2

        public DtoInvoices selectById(int id, string lang)
        {
            var list = new DtoInvoices();
            if (lang == "en")
            {
                list = (from q in Context.invoices
                        where q.id == id
                        select new DtoInvoices
                        {
                            projectId = q.projectId,
                            invoiceNumber = q.invoiceNumber,
                            invoicesDate = q.invoicesDate,
                            total = q.total,
                            insurancePercent = q.insurancePercent,
                            insuranceValue = q.insuranceValue,
                        }).FirstOrDefault();
            }
            else
            {
                list = (from q in Context.invoices
                        where q.id == id
                        select new DtoInvoices
                        {
                            projectId = q.projectId,
                            invoiceNumber = q.invoiceNumber,
                            invoicesDate = q.invoicesDate,
                            total = q.total,
                            insurancePercent = q.insurancePercent,
                            insuranceValue = q.insuranceValue,
                        }).FirstOrDefault();
            } return list;
        }




    }
}

